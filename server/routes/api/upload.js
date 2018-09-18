const Busboy = require('busboy');

module.exports = (app) => {

  // The following is an example of making file upload with
  // additional body parameters.
  // To make a call with PostMan
  // Don't put any headers (content-type)
  // Under body:
  // check form-data
  // Put the body with "element1": "test", "element2": image file

  app.post('/api/upload', function (req, res, next) {

    // This grabs the additional parameters so in this case passing
    // in "element1" with a value.

   const element1 = req.body.element1;
   var busboy = new Busboy({ headers: req.headers });

   // The file upload has completed
   busboy.on('finish', function() {
    console.log('Upload finished');

    // The uploded files are stored in req.files. In this case,
    // I can only have one and it's req.files.element2:
    // elements2 being the Key of the Key-value pair that I will upload with postman
    // This returns:
    // {
    //    element2: {
    //      data: ...contents of the file...,
    //      name: 'Example.jpg',
    //      encoding: '7bit',
    //      mimetype: 'image/png',
    //      truncated: false,
    //      size: 959480
    //    }
    // }
    // Grabs your file object from the request.

    const file = req.files.element2;
    console.log(file);
   });
   req.pipe(busboy);
  });
}
