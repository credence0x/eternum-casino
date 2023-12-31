use core::poseidon::poseidon_hash_span;

/// Generate a random value within a specified upper_bound.
///
/// Args:
///     seed: u256
///         The seed to use for the random number generator.
///     upper_bound: u128
///         The upper_bound of possible values 
///         i.e output will be from 0 to upper_bound - 1.
///
/// Returns:
///     u128
///         A random value within the specified upper_bound.
///
fn random(seed: u256, upper_bound: u128) -> u128 {
    seed.low % upper_bound 
}


fn make_seed_from_transaction_hash(salt: u128) -> u256 {
    return poseidon_hash_span(
        array![
            starknet::get_tx_info().unbox().transaction_hash.into(),
            salt.into() 
        ].span()
    ).into();
}