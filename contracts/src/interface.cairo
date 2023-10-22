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
        self: @TContractState, world: IWorldDispatcher, location: Coord, 
        min_deposit_resources: Span<(u8, u128)>, min_closing_resources: Span<(u8, u128)>
    ) -> ID;
}
