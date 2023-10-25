use eternum::alias::ID;
use eternum::models::position::Coord;

use dojo::world::IWorldDispatcher;
use starknet::ContractAddress;

#[starknet::interface]
trait ICasinoPlaySystems<TContractState> {
    fn gamble(self: @TContractState, world: IWorldDispatcher, entity_id: ID, caravan_id: ID, casino_id: ID);
    fn get_winner(self: @TContractState, world: IWorldDispatcher, resource_systems_address: ContractAddress, casino_id: ID) -> ID;
}

#[starknet::interface]
trait ICasinoConfigSystems<TContractState> {
    fn create(
        self: @TContractState, world: IWorldDispatcher,
        casino_play_systems_address: ContractAddress, location: Coord, 
        min_deposit_resources: Span<(u8, u128)>, min_closing_resources: Span<(u8, u128)>
    ) -> ID;
}

#[starknet::interface]
trait INewResourceSystems<TContractState> {
    fn approve(
        self: @TContractState, world: IWorldDispatcher, 
        entity_id: ID, approved_entity_id: ID, resources: Span<(u8, u128)>
    );
    fn transfer(
        self: @TContractState, world: IWorldDispatcher, sending_entity_id: ID,
        receiving_entity_id: ID, resources: Span<(u8, u128)>
    );

    fn transfer_from(
        self: @TContractState, world: IWorldDispatcher, 
        approved_entity_id: ID, owner_entity_id: ID, 
        receiving_entity_id: ID, resources: Span<(u8, u128)>
    );
}
