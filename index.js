const installNewDataIpfs = require("./utils/installNewDataIpfs");
const rewriteImgCid = require("./utils/rewriteImgCid");

(async () => {
  await installNewDataIpfs({ folder: "images", data: "images" });
  console.log("Images successfully installed");
  await rewriteImgCid();
  console.log("Metadata has been updated");
  await installNewDataIpfs({ folder: "metadata", data: "metadata" });
  console.log("Done");
})();
