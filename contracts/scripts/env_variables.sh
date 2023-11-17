#!/bin/bash

# Default values (dev)
STARKNET_RPC_URL="http://localhost:5050"
DOJO_ACCOUNT_ADDRESS="0x74bfdb5562f91764fddbbf3f4fb322de114a00d6d6889b19a4dd7b45d5ba24d"
DOJO_PRIVATE_KEY="0xc5b2fcab997346f3ea1c00b002ecf6f382c5f9c9659a3894eb783c5320f912"
SOZO_WORLD="0x4d79c99ce9b489b77461e3491970ea5ede1f1966f4d2ff65ee76cd8701d6dad"

# Check if the first argument is provided and set it to "dev" or "prod"
if [[ ! -z "$1" ]]; then
    if [[ "$1" == "prod" ]]; then
        echo "is prod"
        STARKNET_RPC_URL="https://api.cartridge.gg/x/eternum2/katana"
        DOJO_ACCOUNT_ADDRESS="0x4011e376fe0e8be617470fc8c3ccb11a0f88e383e42ed6af9d934f7d3af8091"
        DOJO_PRIVATE_KEY="0x7318b1bb2c88be4d85f7df34eed7f3bfcc396e7cadae945fe6465cf8f589055"
    elif [[ "$1" != "dev" ]]; then
        echo "Invalid argument. Use 'dev' or 'prod'."
        exit 1
    fi
fi

# Set the environment variables
export STARKNET_RPC_URL
export DOJO_ACCOUNT_ADDRESS
export DOJO_PRIVATE_KEY
export SOZO_WORLD

# Optional: Display the chosen configuration
echo "Selected configuration:\n"
# set color blue
echo "\033[0;34m"
echo "STARKNET_RPC_URL: $STARKNET_RPC_URL\n"
echo "DOJO_ACCOUNT_ADDRESS: $DOJO_ACCOUNT_ADDRESS\n"
echo "DOJO_PRIVATE_KEY: $DOJO_PRIVATE_KEY\n"
echo "SOZO_WORLD: $SOZO_WORLD\n"
echo "\033[0m"
 echo "\n\n\n" 