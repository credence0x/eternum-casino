use eternum::alias::ID;

use dojo::world::IWorldDispatcher;

#[starknet::interface]
trait ICasinoSystems<TContractState> {
    fn gamble(self: @TContractState, world: IWorldDispatcher, entity_id: ID, caravan_id: ID, casino_id: ID);
    fn get_winner(self: @TContractState, world: IWorldDispatcher, casino_id: ID) -> ID;
}