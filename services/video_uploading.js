// import cloudinary from 'cloudinary';
// import { IncomingForm } from 'formidable';
const cloudinary = require('cloudinary');
const formidable = require('formidable');
const incomingForm = require('formidable').IncomingForm
cloudinary.config({
  cloud_name: 'dou4tgpae',
  api_key: '756779964561496',
  api_secret: 'M0VKY4EXVe7e1wAH3-Y7q_y7pJk',
});

const config = {
  api: {
    bodyParser: false,
  },
};

const uploadVideo = (req, res) => {
  const form = formidable();

  form.parse(req, (err, fields, files) => {
    const file = req.incomingForm.inputFile
    //const file = files?.inputFile.path;
    console.log(file)
    cloudinary.v2.uploader.upload(file, {
        resource_type: 'video',
        public_id: 'my_video',
      }, result => {
      // This will return the output after the code is exercuted both in the terminal and web browser
      // When successful, the output will consist of the metadata of the uploaded file one after the other. These include the name, type, size and many more.
        console.log(result)
        if (result.public_id) {
      
      // The results in the web browser will be returned inform of plain text formart. We shall use the util that we required at the top of this code to do this.
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.write('received uploads:\n\n');
        res.end(util.inspect({ fields: fields, files: files }));
      } 
      });
  });
  // const data = await new Promise((resolve, reject) => {
  //   const form = new incomingForm()

  //   form.parse(req, (err, fields, files) => {
  //     if (err) return reject(err);
  //     resolve({ fields, files });
  //   });
  // });

  // const file = data?.files?.inputFile.path;

  // const response = await cloudinary.v2.uploader.upload(file, {
  //   resource_type: 'video',
  //   public_id: 'my_video',
  // });
  // return res.json(response);
};

module.exports = {
  uploadVideo
}
