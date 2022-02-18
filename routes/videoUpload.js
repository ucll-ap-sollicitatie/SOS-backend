const credentials = require("../configuration/secret");
const cloudinary = require("cloudinary");

cloudinary.config(credentials.cloudinaryConfig);

const uploadVideo = async (req, res) => {
  console.log(req.files);
  const newVideo = req.files.newRecording;
  const response = await cloudinary.v2.uploader
    .upload(newVideo.tempFilePath, {
      resource_type: "auto",
      public_id: `SOS/${newVideo.name}`,
    })
    .catch((e) => console.log(`Upload failed: ${e}`));
  return res.json(response);
};

module.exports = {
  uploadVideo,
};
