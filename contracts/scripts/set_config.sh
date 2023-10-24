#!/bin/bash



CASINO_CONFIG_SYSTEMS="0x62b8abc7f76bc754bffb033fab3b3f1dc3361f8e68763a2bf4e8e8bb185e043";
CASINO_PLAY_SYSTEMS="0x257c6dafcc9d15c037887335d21232ca603cc2129e14d554ea103569bf71ef2";
NEW_RESOURCE_SYSTEMS="0x5731b6138194f548207fd42d38d906951c30c57c0f546c7848c8e807ad30d68";

CASINO_METADATA_MODEL_CLASS_HASH="0x6c80436b3f9eaa572b50221cf9a9450578d5fab6e806522e7bdb6506a94e855";
CASINO_ROUND_MODEL_CLASS_HASH="0x2d327218a3db56c834e55986983680a7c529aeb3d85cf8f1868fec48c321c8e";
CASINO_PARTICIPANT_MODEL_CLASS_HASH="0x485e3b6672ba88cfb91f4c14f2e2664dda29112e8cac4c165a8118c8b8175bb";
RESOURCE_ALLOWANCE_MODEL_CLASS_HASH="0xf95df8453332faed65c531cfc05eb8901f6ede4221a0b1306d8c23532b68eb";

commands=(
    "sozo register model $CASINO_METADATA_MODEL_CLASS_HASH --world $SOZO_WORLD"
    "sozo register model $CASINO_ROUND_MODEL_CLASS_HASH --world $SOZO_WORLD"
    "sozo register model $CASINO_PARTICIPANT_MODEL_CLASS_HASH --world $SOZO_WORLD"
    "sozo register model $RESOURCE_ALLOWANCE_MODEL_CLASS_HASH --world $SOZO_WORLD"
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

commands+=(
    #     # Define casinos
    #     # @dev generated using data/casinos/generateCommands.js
    #     # data => ./contracts/src/scripts/casinos/casinos.json
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,1622610,2103276,4,1,10000,2,10000,3,10000,4,10000,4,1,100000,2,100000,3,100000,4,100000"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,2651909,1458147,4,1,10000,2,10000,3,10000,4,10000,4,1,100000,2,100000,3,100000,4,100000"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,1620208,1764081,4,1,10000,2,10000,3,10000,4,10000,4,1,100000,2,100000,3,100000,4,100000"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,2949158,2127177,4,1,10000,2,10000,3,10000,4,10000,4,1,100000,2,100000,3,100000,4,100000"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,710492,1446359,4,1,10000,2,10000,3,10000,4,10000,4,1,100000,2,100000,3,100000,4,100000"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,2475183,2275580,4,1,10000,2,10000,3,10000,4,10000,4,1,100000,2,100000,3,100000,4,100000"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,1984116,2171570,4,1,10000,2,10000,3,10000,4,10000,4,1,100000,2,100000,3,100000,4,100000"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,1382094,1993452,4,1,10000,2,10000,3,10000,4,10000,4,1,100000,2,100000,3,100000,4,100000"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,863997,1873356,4,1,10000,2,10000,3,10000,4,10000,4,1,100000,2,100000,3,100000,4,100000"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,2539517,1884363,4,1,10000,2,10000,3,10000,4,10000,4,1,100000,2,100000,3,100000,4,100000"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,1067424,1476206,4,1,10000,2,10000,3,10000,4,10000,4,1,100000,2,100000,3,100000,4,100000"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,1542668,1517683,4,1,10000,2,10000,3,10000,4,10000,4,1,100000,2,100000,3,100000,4,100000"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,1936818,1409047,4,1,10000,2,10000,3,10000,4,10000,4,1,100000,2,100000,3,100000,4,100000"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,2102443,1712964,4,1,10000,2,10000,3,10000,4,10000,4,1,100000,2,100000,3,100000,4,100000"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,2874078,1697894,4,1,10000,2,10000,3,10000,4,10000,4,1,100000,2,100000,3,100000,4,100000"
    "sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,575410,2023632,4,1,10000,2,10000,3,10000,4,10000,4,1,100000,2,100000,3,100000,4,100000"

)


# # Ask the user for the desired delay between commands
# read -p "Specify a delay in seconds between each command (or press Enter for no delay): " delay

# # Check if the delay is a valid number (integer or floating point)
# if [[ ! "$delay" =~ ^[0-9]*\.?[0-9]+$ ]]; then
#     delay=0
# fi

if [ "$1" ]; then
    delay="$1"
else
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

