const { readFileSync, writeFileSync } = require("fs");
const recursive = require("recursive-fs");

const rewriteImgCid = async () => {
  const { files } = await recursive.read("metadata");
  const json = readFileSync("output/images.json", "utf8");
  const key = JSON.parse(json).images;
  await files.forEach((file, i) => {
    const json = readFileSync(file, "utf-8");
    const object = JSON.parse(json);
    object.image = `ipfs://${key}/${i + 1}.png`;
    writeFileSync(file, JSON.stringify(object));
  });
};

module.exports = rewriteImgCid;
