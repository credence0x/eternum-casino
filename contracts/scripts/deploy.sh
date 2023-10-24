# Make sure katana is before calling this script 

# Check if the delay is a valid number (integer or floating point)
if [[ "$1" == "prod" ]]; then    
    # set color red
    echo "\033[0;31m"
    echo "\n\nWARNING: You are about to deploy to production."
    echo "Are you sure you want to continue? (y/n)\n"
    echo "\033[0m"

    read -r CONTINUE
    if [[ "$CONTINUE" != "y" ]]; then
        echo "Aborting."
        exit 1
    fi

    DELAY=3
    sozo build && sozo migrate && source ./scripts/env_variables.sh prod && echo "\n\n\n" && ./scripts/set_config.sh $DELAY
else 
    # set color orange
    echo "\033[0;33m"
    echo "\n\nBUILDING AND DEPLOYING TO DEV \n\n"
    echo "\033[0m"

    DELAY=1
    sozo build && sozo migrate && source ./scripts/env_variables.sh && echo "\n\n\n" && ./scripts/set_config.sh $DELAY
fi