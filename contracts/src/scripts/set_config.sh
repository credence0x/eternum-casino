#!/bin/bash

CASINO_CONFIG_SYSTEMS="0x20b2f63665222d35a9bef2a9097ab1a0d658928402281aebc2f0ad7ebb53445";
CASINO_PLAY_SYSTEMS="0x6b298d31939da9d437e74cee14d316a3f0ba70bbca56b255e9d685f61a7e72d";


resource_precision=1000
commands+=(
    # Define casinos
    # @dev generated using data/casinos/generateCommands.js
    # data => ./contracts/src/scripts/casinos/casinos.json
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,1642610,2103276,4,1,10,2,10,3,10,4,10,4,1,100,2,100,3,100,4,100"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,2631909,1458147,4,1,10,2,10,3,10,4,10,4,1,100,2,100,3,100,4,100"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,1640208,1764081,4,1,10,2,10,3,10,4,10,4,1,100,2,100,3,100,4,100"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,2929158,2127177,4,1,10,2,10,3,10,4,10,4,1,100,2,100,3,100,4,100"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,730492,1446359,4,1,10,2,10,3,10,4,10,4,1,100,2,100,3,100,4,100"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,2455183,2275580,4,1,10,2,10,3,10,4,10,4,1,100,2,100,3,100,4,100"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,1964116,2171570,4,1,10,2,10,3,10,4,10,4,1,100,2,100,3,100,4,100"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,1402094,1993452,4,1,10,2,10,3,10,4,10,4,1,100,2,100,3,100,4,100"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,883997,1873356,4,1,10,2,10,3,10,4,10,4,1,100,2,100,3,100,4,100"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,2519517,1884363,4,1,10,2,10,3,10,4,10,4,1,100,2,100,3,100,4,100"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,1087424,1476206,4,1,10,2,10,3,10,4,10,4,1,100,2,100,3,100,4,100"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,1562668,1517683,4,1,10,2,10,3,10,4,10,4,1,100,2,100,3,100,4,100"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,1916818,1409047,4,1,10,2,10,3,10,4,10,4,1,100,2,100,3,100,4,100"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,2082443,1712964,4,1,10,2,10,3,10,4,10,4,1,100,2,100,3,100,4,100"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,2854078,1697894,4,1,10,2,10,3,10,4,10,4,1,100,2,100,3,100,4,100"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,595410,2023632,4,1,10,2,10,3,10,4,10,4,1,100,2,100,3,100,4,100"
)


# Read the System to Components JSON file
system_models_json=$(cat ./scripts/system_models.json)

# Loop through each system
for system in $(echo $system_models_json | jq -r 'keys[]'); do
    # Loop through each component that the system writes to
    for model in $(echo $system_models_json | jq -r ".$system[]"); do
        system_var="${system}"
        contract_address="${!system_var}"
        # make the system a writer of the component
        commands+=("sozo auth writer --world "$SOZO_WORLD" $model $contract_address")
    done
done


# Ask the user for the desired delay between commands
read -p "Specify a delay in seconds between each command (or press Enter for no delay): " delay

# Check if the delay is a valid number (integer or floating point)
if [[ ! "$delay" =~ ^[0-9]*\.?[0-9]+$ ]]; then
    delay=0
fi

for cmd in "${commands[@]}"; do
    echo "Executing command: $cmd"
    output=$(eval "$cmd")
    echo "Output:"
    echo "$output"
    echo "--------------------------------------"

    if [ $(echo "$delay > 0" | bc -l) -eq 1 ]; then
        echo "Sleeping for $delay seconds..."
        sleep $delay
    fi
done

