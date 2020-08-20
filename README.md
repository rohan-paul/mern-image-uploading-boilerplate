### A super basic file upload functionality using busboy.

#### No front-end implemented here (which would have been a simple form to upload file with a post action). So the file upload need to be done with postman.

### In Postman > Navigate to the endpoint http://localhost:8080/api/upload  > select POST > Body > select form-data and for the key field (i.e. the parameters ) type 'element2' and choose file instead of text. Then in value field click on "Choose Files" and select a file from the local machine's file-browser. I will get below kind of output in the Terminal.


```
element1
ExampleText
Upload finished
{ data: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 01 f2 00 00 00 65 08 03 00 00 00 81 5b 91 ad 00 00 00 81 50 4c 54 45 00 00 00 ff ff ff 4f 4f 4f ... >,
  name: 'smartport.jpeg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  truncated: false,
  size: 4167 }

```
When I click on “Send” in Postman, I won’t see a response. The request didn’t have a response but if you check your terminal you’ll see file content.

I added **busboy** to the starter boilerplate project that was using the following technologies:
- [React](https://facebook.github.io/react/) and [React Router](https://reacttraining.com/react-router/) for the frontend
- [Express](http://expressjs.com/) and [Mongoose](http://mongoosejs.com/) for the backend
- [Sass](http://sass-lang.com/) for styles (using the SCSS syntax)
- [Webpack](https://webpack.github.io/) for compilation


## Running the project

Make sure to add a `config.js` file in the `config` folder.  You’ll need to copy the config/config.example.js to config/config.js . Change the Mongo values to work for your environment. For me, my dev environment is no username or password ( localhost:27017/db_name )

```shell
npm install
```
Production mode:

```shell
npm start
```

Development (Webpack dev server) mode:

```shell
npm run start:dev
```

### Why I would use node's stream in uploading file (this is how sometime I implement busboy)

Handling file uploads in Node.js may seem at first glance like a simple task. Modules like multer allows me to easily handle file uploads as part of an express route. This works great for small files that don’t leave a significant memory footprint. But what happens when you upload very large files and load them into memory? The problem with loading a large file into memory is that you can actually run out of memory and cause your application to crash.

Streams help you work around this problem by acting on chunks of data at a time. In this way, you can process a subset of a binary at a time and avoid using large chunks of memory.