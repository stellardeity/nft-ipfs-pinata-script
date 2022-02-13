require("dotenv").config();
const { PINATA_API_KEY, PINATA_API_SECRET } = process.env;
const axios = require("axios");
const fs = require("fs-extra");
const recursive = require("recursive-fs");
const FormData = require("form-data");
const basePathConverter = require("base-path-converter");

const PINATA_API_PINFILETOIPFS =
  "https://api.pinata.cloud/pinning/pinFileToIPFS";

const uploadAssets = async (folder) => {
  try {
    const outputPath = `./output/${folder}.json`;
    const folderPath = folder;
    const { files } = await recursive.read(folderPath);

    if (files?.length <= 0) {
      console.info("No files were found in folder path.");
      return;
    }
    const formData = new FormData();
    files.forEach((filePath) => {
      formData.append("file", fs.createReadStream(filePath), {
        filepath: basePathConverter(folderPath, filePath),
      });
    });
    formData.append(
      "pinataMetadata",
      JSON.stringify({
        name: folderPath,
      })
    );
    const {
      data: { IpfsHash: cid },
    } = await axios.post(PINATA_API_PINFILETOIPFS, formData, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET,
      },
    });
    fs.outputJsonSync(outputPath, { [folderPath]: cid });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = uploadAssets;
