import dotenv from 'dotenv'
import fetch from 'node-fetch'
import fs from "fs-extra";
import recursive from "recursive-fs";
import FormData from "form-data";
import basePathConverter from "base-path-converter";

const PINATA_API_PINFILETOIPFS =
  "https://api.pinata.cloud/pinning/pinFileToIPFS";
const { PINATA_API_KEY, PINATA_API_SECRET } = dotenv.config().parsed

export const uploadAssets = async (folder) => {
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
    const data = await fetch(PINATA_API_PINFILETOIPFS, {
      method: 'POST',
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET,
      },
      body: formData
    });
    const { IpfsHash: cid } = await data.json()
    fs.outputJsonSync(outputPath, { [folderPath]: cid });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

