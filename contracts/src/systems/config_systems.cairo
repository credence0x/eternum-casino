#[dojo::contract]
mod casino_config_systems {
    use casino::models::{CasinoMetaData, CasinoRound};
    use casino::interface::ICasinoConfigSystems;
    
    use eternum::alias::ID;
    use eternum::models::position::{Position, Coord};
    use eternum::models::resources::ResourceCost;


    #[external(v0)]
    impl CasinoConfigSystemsImpl of ICasinoConfigSystems<ContractState>{

        fn create(
            self: @ContractState, world: IWorldDispatcher, location: Coord, 
            min_deposit_resources: Span<(u8, u128)>, min_closing_resources: Span<(u8, u128)>
        ) -> ID {

            let mut min_deposit_resources = min_deposit_resources;
            let mut min_closing_resources = min_closing_resources;
            
            let min_deposit_resource_count: u128 = min_deposit_resources.len().into();
            assert(min_deposit_resource_count > 0, 'resources must not be empty');

            let min_closing_resource_count: u128 = min_closing_resources.len().into();
            assert(min_closing_resource_count > 0, 'resources must not be empty');

            // specify the minimum resources needed for an 
            // entity to enter a gambling round
            let min_deposit_resource_cost_id: ID = world.uuid().into();
            let mut index = 0;
            loop {
                match min_deposit_resources.pop_front() {
                    Option::Some((resource_type, resource_amount)) => {
                        assert(*resource_amount > 0, 'amount must not be 0');

                        set!(world, (
                            ResourceCost {
                                entity_id: min_deposit_resource_cost_id,
                                index,
                                resource_type: *resource_type,
                                amount: *resource_amount
                            }
                        ));

                        index += 1;
                    },
                    Option::None => {break;}
                };
            };



            // specify the minimum resources needed to be present
            // in a casino round for the round to close 

            let min_closing_resource_cost_id: ID = world.uuid().into();
            let mut index = 0;
            loop {
                match min_closing_resources.pop_front() {
                    Option::Some((resource_type, resource_amount)) => {
                        assert(*resource_amount > 0, 'amount must not be 0');

                        set!(world, (
                            ResourceCost {
                                entity_id: min_closing_resource_cost_id,
                                index,
                                resource_type: *resource_type,
                                amount: *resource_amount
                            }
                        ));

                        index += 1;
                    },
                    Option::None => {break;}
                };
            };


            // create casino
            let casino_id: u128 = world.uuid().into();
            let round_id: u128 = world.uuid().into();
            set!(world, (
                CasinoMetaData {
                    entity_id: casino_id,
                    current_round_id: round_id,
                    total_rounds_played: 0,
                    min_deposit_resource_cost_id,
                    min_deposit_resource_count,
                    min_closing_resource_cost_id,
                    min_closing_resource_count,
                },
                Position {
                    entity_id: casino_id,
                    x: location.x,
                    y: location.y 
                }
            ));


            // make first round
            set!(world, (
                CasinoRound {
                    casino_id: casino_id,
                    round_id: round_id,
                    round_index: 0,
                    winner_id: 0,
                    participant_count: 0
                }
            ));
     

            casino_id
        }
    }
}
