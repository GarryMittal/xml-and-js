const fs = require("fs");
let filename = `${__dirname}/books.json`;

const checkIfExists = (filename) =>
  new Promise((resolve, reject) => {
    fs.exists(filename, (exists) => {
      if (exists) {
        resolve(filename);
      } else {
        reject("404: file not found");
      }
    });
  });

const checkIfFile = (filename) =>
  new Promise((resolve, reject) => {
    fs.stat(filename, (err, stats) => {
      if (err || !stats.isFile()) {
        reject(err);
      }
             
      else {
        resolve(filename);
        //reject("This location contains not a file");
      }
    });
  });

const readFile = (filename) =>
  new Promise((resolve, reject) => {
    fs.readFile(filename, null, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(JSON.parse(data));
    });
  });

checkIfExists(filename)
.then(()=> checkIfFile(filename))
.then(()=> readFile(filename))
.then(()=>console.log(data))
.catch((error) => console.error(error));
/*const safeReadFile = (filename) =>
  checkIfExists(filename).then(checkIfFile).then(readFile);

safeReadFile(filename).then(console.log).catch(console.error);*/
