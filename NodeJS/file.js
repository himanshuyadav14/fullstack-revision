// const fs = require("fs");
const os = require("os");
console.log(os.cpus().length);

// Synchronous call
// fs.writeFileSync("./sync.txt", "This is synchronous");

// Asynchronous call
// fs.writeFile("./async.txt", "This is asynchronous", (err) => {});

// Synchronous call
// const result = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(result);

// Asynchronous call
// fs.readFile("./contacts.txt", "utf-8", (err, data) => {
//   console.log(data);
// });

// Synchronous
// fs.appendFileSync("./contacts.txt", `${Date.now()} Hey There\n`);
// fs.appendFileSync("./");

//copy directory and file both
// fs.cpSync("src", "dest", { recursive: true });
// fs.cp("./contacts.txt", "./sample.txt", { recursive: true }, (err, data) => {
//   if (err) throw err;
//   console.log("Copied");
// });

//copy file only
// fs.copyFile("src", "dest");
// fs.copyFileSync("src", "dest", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

//status
// const result = fs.statSync("./contacts.txt");
// console.log(result);

//make directory
// fs.mkdirSync("my/1", { recursive: true });

// fs.mkdir("uploads/images", { recursive: true }, (err) => {
//   if (err) throw err;
//   console.log("Folders created");
// });
