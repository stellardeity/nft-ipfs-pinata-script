const uploadAssets = require("./utils/uploadAssets");
const uploadImagePath = require("./utils/uploadImagePath");

main();
async function main() {
  await uploadAssets("images");
  console.log("Images successfully installed");
  await uploadImagePath();
  console.log("Metadata has been updated");
  await uploadAssets("metadata");
  console.log("Done");
}
