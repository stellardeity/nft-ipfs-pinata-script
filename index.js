import { uploadAssets } from "./utils/uploadAssets.js";
import { uploadImagePath } from "./utils/uploadImagePath.js";

main();
async function main() {
  await uploadAssets("images");
  console.log("Images successfully installed");
  await uploadImagePath();
  console.log("Metadata has been updated");
  await uploadAssets("metadata");
  console.log("Done");
}
