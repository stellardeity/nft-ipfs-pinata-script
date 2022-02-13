import { readFileSync, writeFileSync } from "fs";
import recursive from "recursive-fs";

export const uploadImagePath = async () => {
  const { files } = await recursive.read("metadata");
  const json = readFileSync("output/images.json", "utf8");
  const key = JSON.parse(json).images;
  await files.forEach((file, i) => {
    const data = JSON.parse(readFileSync(file, "utf-8"));
    const path = data.image.match(/\/[0-9].+/) || `/${i + 1}.png`
    data.image = `ipfs://${key}${path}`;
    writeFileSync(file, JSON.stringify(data));
  });
};

