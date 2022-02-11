const installNewDataIpfs = require("./utils/installNewDataIpfs");
const rewriteImgCid = require("./utils/rewriteImgCid");

const downloadAllData = async () => {
  try {
    // await rewriteImgCid();
    await installNewDataIpfs({ folder: "metadata", data: "metadata" });
    await installNewDataIpfs({ folder: "images", data: "images" });


    console.log("Done");
  } catch (err) {
    console.error(err);
  }
};

downloadAllData();
