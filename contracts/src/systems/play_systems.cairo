#[dojo::contract]
mod casino_play_systems {
    use casino::models::{Casino, CasinoRound, CasinoRoundParticipant};

    use casino::interface::ICasinoPlaySystems;
    use casino::utils::random::{random, make_seed_from_transaction_hash};

    use eternum::alias::ID;
    use eternum::models::owner::Owner;
    use eternum::models::position::{Position};
    use eternum::models::resources::{Resource, ResourceCost};

    use eternum::systems::resources::interface::{
        IResourceSystemsDispatcher,
        IResourceSystemsDispatcherTrait,
    };

    use starknet::ContractAddress;
    use core::integer::BoundedInt;

    #[external(v0)]
    impl CasinoPlaySystemsImpl of ICasinoPlaySystems<ContractState>{


        fn gamble(
            self: @ContractState, world: IWorldDispatcher,
            entity_id: ID, caravan_id: ID, casino_id: ID
        ) {

            let casino = get!(world, casino_id, Casino);
            assert(casino.current_round_id != 0 , 'does not exist');

            let entity_owner = get!(world, entity_id, Owner);
            assert(
                entity_owner.address == starknet::get_caller_address(), 
                    'not owner of entity'
            );

            let caravan_owner = get!(world, caravan_id, Owner);
            assert(
                caravan_owner.address == starknet::get_caller_address(), 
                    'not owner of caravan'
            );

            let casino_position = get!(world, casino_id, Position);
            let caravan_position = get!(world, caravan_id, Position);

            assert(casino_position.x == caravan_position.x, 'position mismatch');
            assert(casino_position.y == caravan_position.y, 'position mismatch');

            let mut casino_round
                = get!(world, (casino_id, casino.current_round_id), CasinoRound);
            assert(casino_round.winner_id == 0, 'round has ended');

            // ensure that the entity's caravan is 
            // carrying enough resources to enter
            // then offload caravan

            let mut index = 0;
            loop {
                if index == casino.min_deposit_resource_count {
                    break;
                }

                let min_deposit_resource_cost 
                    = get!(world, (casino.min_deposit_resource_cost_id, index), ResourceCost);
            
                let mut caravan_resource 
                    = get!(world, (caravan_id, min_deposit_resource_cost.resource_type), Resource);
                assert(
                    caravan_resource.balance >= min_deposit_resource_cost.amount, 
                    'insufficient resource'
                );

                let mut casino_round_resource 
                = get!(world, (casino_round.round_id, min_deposit_resource_cost.resource_type), Resource);

                caravan_resource.balance -= min_deposit_resource_cost.amount;
                casino_round_resource.balance += min_deposit_resource_cost.amount;

                set!(world, (caravan_resource, casino_round_resource));
                
                index += 1;
            };


            // enter the gambling round

            casino_round.participant_count += 1;

            set!(world, (casino_round));
            set!(world, (
                CasinoRoundParticipant {
                    casino_id: casino_round.casino_id,
                    round_id: casino_round.round_id,
                    participant_index: casino_round.participant_count,
                    participant_id: entity_id
                }
            ));
        }



        fn get_winner(
            self: @ContractState, world: IWorldDispatcher, 
            resource_systems_address: ContractAddress, casino_id: ID
        ) -> ID {

            let mut casino = get!(world, casino_id, Casino);
            assert(casino.current_round_id != 0 , 'does not exist');

            // check if the current round can end

            let round_id = casino.current_round_id;

            let mut casino_round = get!(world, (casino_id, round_id), CasinoRound);
            assert(casino_round.participant_count != 0 , 'no round participant');
            assert(casino_round.winner_id == 0 , 'round has ended');
            let mut index = 0;
            loop {
                if index == casino.min_closing_resource_count {
                    break;
                }

                let min_closing_resource_cost 
                    = get!(world, (casino.min_closing_resource_cost_id, index), ResourceCost);
            
                let mut casino_round_resource 
                    = get!(world, (round_id, min_closing_resource_cost.resource_type), Resource);
                assert(
                    casino_round_resource.balance >= min_closing_resource_cost.amount, 
                    'insufficient resources'
                );
               
                index += 1;
            };

            // find winner randomly and set winner

            let seed = make_seed_from_transaction_hash(casino_round.participant_count);
            let winner_index = random(seed, casino_round.participant_count);

            let winning_participant 
                = get!(world, (casino_id, round_id, winner_index), CasinoRoundParticipant);

            casino_round.winner_id = winning_participant.participant_id;
            set!(world, (casino_round));


            // approve winner to spend all resources
            let resource_systems = IResourceSystemsDispatcher {
                contract_address: resource_systems_address
            };
            
            let mut index = 0;
            let mut resources_won: Array<(u8, u128)> = array![];
            loop {
                if index == casino.min_deposit_resource_count {
                    break;
                }

                let min_closing_resource_cost 
                    = get!(world, (casino.min_closing_resource_cost_id, index), ResourceCost);
                let casino_round_resource 
                    = get!(world, (casino_round.round_id, min_closing_resource_cost.resource_type), Resource);
                
                resources_won.append((
                    casino_round_resource.resource_type, casino_round_resource.balance
                ));
                
                index += 1;
            };
            resource_systems.approve(
                world,
                casino_round.round_id,
                winning_participant.participant_id,
                resources_won.span()
            );

            // update casino
            casino.current_round_id = world.uuid().into();
            casino.total_rounds_played += 1;
            set!(world, (casino));

            // create next round
            set!(world, (
                CasinoRound {
                    casino_id: casino.entity_id,
                    round_id: casino.current_round_id,
                    round_index: casino.total_rounds_played,
                    winner_id: 0,
                    participant_count: 0
                }
            ));
            
            winning_participant.participant_id

        }
    }
}
