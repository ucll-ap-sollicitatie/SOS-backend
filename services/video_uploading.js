import cloudinary from 'cloudinary';
import { IncomingForm } from 'formidable';

cloudinary.config({
  cloud_name: 'dou4tgpae',
  api_key: '756779964561496',
  api_secret: 'M0VKY4EXVe7e1wAH3-Y7q_y7pJk',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  const file = data?.files?.inputFile.path;

  const response = await cloudinary.v2.uploader.upload(file, {
    resource_type: 'video',
    public_id: 'my_video',
  });
  return res.json(response);
};