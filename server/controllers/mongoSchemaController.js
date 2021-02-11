
const path = require("path");
const fs = require("fs");
// Connect to mongodb
const MongoClient = require("mongodb").MongoClient;
// Executing terminal commands using JS
const { exec } = require("child_process");

exports.createMongoSchema = (req, res, next) => {
    // console.log(req.body.val);
 let userURI = req.body.val;

// Connect to mongodb
 MongoClient.connect(userURI)
 .then(() => {
  const query = `extract-mongo-schema -d "${userURI}" -o schema.json`;
  //Using exec to run extract-mongo-schema package in terminal
  exec(query, (error, stdout, stderr) => {
   if (error) {
    console.log(`error: ${error.message}`);
    return;
   }
   if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
   }
   console.log(`stdout: ${stdout}`);
  });
 })
 let filepath = path.join(__dirname, "../../")
 let file;
 // Watching for changes in root directory. (The adding of json file with schema)
 const watcher = fs.watch(filepath, (event, trigger) => {
   console.log(`there was a ${event} at ${trigger}`)
   // Once change happens (file is added) read schema.json file
   file = fs.readFileSync(path.join(__dirname, "../../schema.json"))
  //  console.log('SERVER.JS =========> ', Buffer.from(file).toString())
   res.locals.data = Buffer.from(file).toString()
   if (res.locals.data) {
     // send locals data to client, close this watch function
     res.status(200).json(res.locals.data)
     watcher.close()
   }
})
next()
}//

