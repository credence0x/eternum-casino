let casinos = require("./casinos.json");

let commands = "";

casinos.forEach((casino) => {
  const { x, z: y, resources } = casino;
  const deposit = resources.minimum_deposit;
  const completion = resources.minimum_completion;

  // Extracting values for deposit
  const numDepositResources = deposit.length;
  const depositStrings = deposit
    .map((res) => `${res.resourceType},${parseInt(res.amount)}`)
    .join(",");

  // Extracting values for completion
  const numCompletionResources = completion.length;
  const completionStrings = completion
    .map((res) => `${res.resourceType},${parseInt(res.amount)}`)
    .join(",");

  // Formatting the coords
  const coordX = parseInt(x * 10000 + 1800000);
  const coordY = parseInt(y * 10000 + 1800000);

  // Constructing the command
  commands += `"sozo execute $CASINO_CONFIG_SYSTEMS create --account-address $DOJO_ACCOUNT_ADDRESS --calldata $SOZO_WORLD,$CASINO_PLAY_SYSTEMS,${coordX},${coordY},${numDepositResources},${depositStrings},${numCompletionResources},${completionStrings}"\n`;
});

console.log(commands);
