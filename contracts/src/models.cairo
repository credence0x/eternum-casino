#[derive(Model, Copy, Drop, Serde)]
struct CasinoMeta {
    #[key]
    entity_id: u128,
    current_round_id: u128,
    total_rounds_played: u128,

    // minimum resource deposit
    min_deposit_resource_cost_id: u128,
    min_deposit_resource_count: u128,

    // minimum resources needed for round to end
    min_closing_resource_cost_id: u128,
    min_closing_resource_count: u128,
}

#[derive(Model, Copy, Drop, Serde)]
struct CasinoContestRound {
    #[key]
    casino_id: u128,
    #[key]
    round_id: u128,
    round_id_dup: u128,
    round_index: u128,
    winner_id: u128,
    participant_count: u128
}

#[derive(Model, Copy, Drop, Serde)]
struct CasinoContestRoundParticipant {
    #[key]
    casino_id: u128,
    #[key]
    round_id: u128,
    #[key]
    participant_index: u128,
    participant_id: u128
}