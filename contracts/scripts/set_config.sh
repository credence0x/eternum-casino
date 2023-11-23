#!/bin/bash



CASINO_CONFIG_SYSTEMS="0x69bcf1d0a7a64dd94bcbe42b0be2c2f8fd3aa001aee4686e021ee3c0b43b719";
CASINO_PLAY_SYSTEMS="0x2f82bd50361996e3e622908591f19b4f1f2fef490104e5b9644cefc8e155b52";
NEW_RESOURCE_SYSTEMS="0x37055c1a1fab0d7ab08f993e3c75852fc7f57d9c5c085ec4b9f95cc4b21cb9c";


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

commands+=(
    #     # Define casinos
    #     # @dev generated using data/casinos/generateCommands.js
    #     # data => ./contracts/src/scripts/casinos/casinos.json
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,$CASINO_PLAY_SYSTEMS,1620208,1764081,9,254,500000,255,500000,11,1000,9,5000,6,10000,1,100000,2,100000,3,100000,4,100000,9,254,2500000,255,2500000,11,5000,9,25000,6,50000,1,500000,2,500000,3,500000,4,500000"
)

#Ensure there is a --delay flag
if [ "$1" == "--delay" ]; then
    # get the delay value
    delay="$2"
else
    echo "Please specify a delay in seconds between each command with the --delay flag"
    exit 1
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

