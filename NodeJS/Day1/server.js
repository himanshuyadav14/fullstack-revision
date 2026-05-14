//Q-1: What is Node.js? Why was it created? How is it different from running JavaScript in a browser?

// Node.js is a JavaScript runtime environment built on Chrome's V8 engine. It was created in 2009 by Ryan Dahl to solve the problem of slow, blocking web servers. It allows JavaScript to run outside the browser — on servers, terminals, and devices. Unlike browser JS, Node has no DOM but has access to file system, network, and OS-level features.

//Q-2: What is the Event Loop in Node.js? Why does it exist? How does Node.js handle thousands of requests without creating thousands of threads?
// The event loop is a core mechanism that lets Node.js handle many operations concurrently using a single thread.
// It continuously checks whenever the callstack is empty and is there any callbacks in any of the callback queue for execute. event loop will pop it out from the callbackqueue and push it to the call stack.
// Before node each request is the new thread and threads are heavy because it takes the memory and CPU it doesn't scale well.
// So ryan Dahl Built This to solve non blocking , avoid thred explosion and handle input output efficiently. Code runs on call stack that lives in google v8 engine in synchronous manner, there callbackqueues where stores completed async callbacks , there is microtask queue which has higher priority. then event loop which keeps checking stack empty then checks microtask queue fir then callbcks queue. So Nodejs has libuv so whenever any input/output request comes it offloads this task to libuv. and nodes moves to the next task. when that task is completed it moves to the callback queue and then event loop moves that in the call stack for execution. so that how it does not create 1000 threads for 1000 tasks it handles everything in one thread one call stack only

// Q-3: Output ? and why
// setTimeout(() => console.log("setTimeout"), 0);
// setImmediate(() => console.log("setImmediate"));
// process.nextTick(() => console.log("nextTick"));
// Promise.resolve().then(() => console.log("promise"));

// console.log("start");
// start
// nextTick
// promise
// setTimeout
// setImmediate

// Q-4 What is the difference between CommonJS and ES Modules in Node.js? Why did Node.js originally use CommonJS? And what are the key differences in syntax and behavior?
// Common JS Module is old way when we import modules by
// const {authController} = require("../controllers/auth")
// and export it by module.exports = {authController}; it is synchronous in nature, it blocks the execution while loading, it automatically resolve extention it works without .js

// and ES module is newer way
// in which we import it like this
// import {authController} from "../controller/auth"
// and export it like this export const authController = (req,res)=>{
// } it need file estention. it is async in nature, we can dynamically import it using EX modules with the help of await
// Why Node.js originally used CommonJS — you didn't explain this. CommonJS was created because browsers had no module system at all in early days. Node needed SOME way to split code into files, so they adopted CommonJS from the npm ecosystem.
// Tree shaking — ESM supports tree shaking (dead code elimination), CommonJS does not. This matters in production builds.
// __dirname and __filename — these are available in CommonJS but NOT in ESM. In ESM you have to do this:

// javascriptimport { fileURLToPath } from 'url'
// import { dirname } from 'path'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)
// File to enabledefault in Node"type":"module" in package.json

// Q-5 What is the fs module in Node.js? What is the difference between fs.readFile() and fs.readFileSync()? When would you use one over the other in a real backend application?

// fs is filesystem module in js it used to read the file from system. fs.readFile is async operation it read the file async and does not block the loading, and on the other side fs.readFileSync() this is synchronous file reading in this loading is blocked until file is fully read. whenever in real backend application file reading is necessary at some step because this info is needed at next line of code then we have to use fs.readFileSync() othwesr we can use fs.readFile() for async file reading

// const fs = require("fs");
// fs.readFile("file.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// const data = fs.readFileSync("file.txt", "utf-8");
// console.log(data);

// ❌ NEVER do this in a route handler
// app.get('/data', (req, res) => {
//     const data = fs.readFileSync('bigfile.txt', 'utf8') // blocks everyone
//     res.send(data)
// })

// // ✅ Do this instead
// app.get('/data', (req, res) => {
//     fs.readFile('bigfile.txt', 'utf8', (err, data) => {
//         res.send(data)
//     })
// })

// Q-6 What are Streams in Node.js? Why do they exist? What is the difference between reading a file with fs.readFile() vs reading it with streams? Give a real world use case.
// Streams in nodejs is a way by which we can process the data in chunks , instead of loading everything into memory at once. Streams exist because if process the files without streams all at once then that will take lots of space in memory as well as it will be slow process so we will not use fs.readFile for large files we will use fs.createReadStream() like that so that it will read the file in chunk.
// const fs = require("fs");
// const stream = fs.createReadStream("file.txt");
// stream.on("data", (chunk) => {
//   console.log(chunk);
// });

// 4 types of streams — important interview point you missed:
// fs.createReadStream(), fs.createWriteStream(), fs.createDuplexStream(), zlib.createGzip();

// const fs = require('fs')

// // Without pipe - manual
// const readable = fs.createReadStream('input.txt')
// const writable = fs.createWriteStream('output.txt')
// readable.on('data', (chunk) => {
//     writable.write(chunk)
// })

// // With pipe - clean and automatic
// fs.createReadStream('input.txt')
//   .pipe(fs.createWriteStream('output.txt'))

// Real world — compress a large file
// const fs = require('fs')
// const zlib = require('zlib')

// fs.createReadStream('large.txt')
//   .pipe(zlib.createGzip())
//   .pipe(fs.createWriteStream('large.txt.gz'))
// // This handles a 10GB file with barely any memory usage

// Q-7 What are Buffers in Node.js? Why do they exist? How are they different from strings? Give an example of creating and reading a Buffer.
// Buffer is a fixed size raw binary memory container used to store data in form of bytes. They allow node to handle binary data like files, streams. JS works with string (utf-16) not designed for raw binary data but backend has to handle images, videos, files etc so node introduce buffers to handle binary data.
// const buf = Buffer.from("Hello");
// console.log(buf);
// // <Buffer 48 65 6c 6c 6f>
// console.log(buf.toString()); // Hello
// console.log(buf[0]);         // 72 ('H') Streams (chunk is a Buffer)

// File system (fs.readFile)

// ✅ What was right:

// Fixed size raw binary memory container — correct
// Stores data in bytes — correct
// Why they exist — JS is string based (utf-16), backend needs binary — correct
// Real world use cases — images, videos, files — correct
// Buffer.from() — correct
// Hex output — correct
// .toString() to convert back — correct
// buf[0] gives byte value — correct
// Streams chunks are Buffers — correct

// ⚠️ What was missing:

// Buffer.alloc() vs Buffer.from() — two different ways to create:
// Buffer.from() — create from existing data
// const buf1 = Buffer.from('Hello')           // from string
// const buf2 = Buffer.from([72, 101, 108])    // from array of bytes
// const buf3 = Buffer.from(buf1)              // copy of another buffer

// // Buffer.alloc() — create empty buffer of fixed size
// const buf4 = Buffer.alloc(10)        // 10 bytes, filled with 0s
// const buf5 = Buffer.alloc(10, 1)     // 10 bytes, filled with 1s
// 2. Encoding options — you didn't mention:
// const buf = Buffer.from('Hello')
// console.log(buf.toString('utf8'))    // Hello
// console.log(buf.toString('hex'))     // 48656c6c6f
// console.log(buf.toString('base64'))  // SGVsbG8=

// Q-8 What is the difference between require() and import()? What happens internally when Node.js executes require() — walk me through the steps?
// ⚔️ `require()` vs `import`
// In Node.js you have two module systems:
// 🔹 Syntax

// ```

// ```

// ```
// // CommonJS
// const fs = require("fs");

// // ES Modules
// import fs from "fs";
// 🔥 Key Differences
// Feature	require() (CommonJS)	import (ESM)
// Loading	Synchronous	Asynchronous
// Execution	Runtime	Parsed before execution
// Where used	Node (older default)	Modern JS (browser + Node)
// Dynamic loading	Yes (require())	Yes (import())
// Top-level await	❌	✅
// 🧠 Simple intuition
// require() → “load this module right now”
// import → “declare dependency, load it before execution”
// 🔬 What happens internally when require() runs?

// This is the real gold part 👇

// 🧩 Step-by-step flow
// 1️⃣ Resolve module path

// Node decides:

// Core module? (fs, http)
// File? (./file.js)
// Package? (node_modules)

// 👉 Uses module resolution algorithm
// 2️⃣ Check cache
// require.cache

// 👉 If already loaded:

// Return cached module ✅
// No re-execution
// 3️⃣ Load file

// If not cached:

// Reads file from disk (fs internally)
// 4️⃣ Wrap code in function

// Node wraps your file like this:

// (function (exports, require, module, __filename, __dirname) {
//   // your code
// });

// 👉 This is why you get:

// module.exports
// __dirname
// require inside file
// 5️⃣ Execute code
// Runs inside Google V8 Engine
// Builds module.exports
// 6️⃣ Cache the module
// require.cache[modulePath] = module;

// 👉 Prevents re-running

// 7️⃣ Return exports
// return module.exports;
// ```

// Q-9 Output ?
// console.log("1");

// setTimeout(() => console.log("2"), 0);

// Promise.resolve()
//   .then(() => console.log("3"))
//   .then(() => console.log("4"));

// process.nextTick(() => console.log("5"));

// console.log("6");

// 1
// 6
// 5
// 3
// 4
// 2

// Q-10 What is middleware in Node.js context? Before Express — how would you handle a raw HTTP request in Node.js using the http module? Write the code to create a basic HTTP server that returns "Hello World" on route / and "Not Found" on any other route.

// Middleware = functions that run between request and response, with access to req, res, and next.

// const http = require("http");
// const PORT = 3000;
// const server = http.createServer((req, res) => {
//   const { url, method } = req;

//   if (url === "/" && method === "GET") {
//     res.writeHead(200, { "Content-type": "text/plain" });
//     res.end("Hello World");
//   } else {
//     res.writeHead(404, { "Content-type": "text/plain" });
//     res.end("Not Found");
//   }
// });

// server.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

// Q-11 What is the Node.js cluster module? Why does it exist? How does it relate to the Event Loop being single threaded?

// The cluster module lets you create multiple Node.js processes (workers) that share the same server port.
// 👉 Each worker:
// Runs on a separate CPU core
// Has its own event loop + memory

// const express = require("express");
// const cluster = require("cluster");
// const os = require("os");

// const totalCpus = os.cpus().length;

// if (cluster.isPrimary) {
//   for (let i = 0; i < totalCpus; i++) cluster.fork();
// } else {
//   const app = express();
//   const PORT = 3000;

//   app.get("/", (req, res) => {
//     return res.json({ message: `Hello from Express!! ${process.pid}` });
//   });

//   app.listen(PORT, () => {
//     console.log(`App is listening on ${PORT}`);
//   });
// }
// Node.js = single-threaded event loop
// Can only use 1 CPU core per process

// Uses all CPU cores
// Better performance under load
// Fault isolation (one worker crash ≠ full crash)

// Since each worker has its own event loop, clustering overcomes the single-threaded limitation of Node.js and improves throughput and scalability.

// Q12. What is the difference between process.env and a .env file? How do you load environment variables in Node.js? Why should you never hardcode secrets in your code?
// require("dotenv").config();

// console.log(process.env.PORT);
// const PORT = process.env.PORT;

// console.log(PORT);

// `process.env` is a built-in object that holds environment variables at runtime. OS environment variables

// * Cloud / CI/CD configs
// * Values loaded from `.env , `A `.env` file is just a plain text file where you store variables. PORT=3000DB_PASSWORD=secret123JWT_SECRET=abcxyz Node.js does not read it automatically ❌ Using dotenv
// Step 1: Install

// ```

// ```

// ```
// npm install dotenv
// ```

// Step 2: Load variables (top of file)

// ```

// ```

// ```
// require("dotenv").config();
// ```

// Step 3: Use them

// ```

// ```

// ```
// const port = process.env.PORT;, we cant hardcode this because then this goes to github security issues and enviroment flexibility for dev, prod uat
// ```

// Q-13 What is the output of this code and why?
// const EventEmitter = require("events");
// const emitter = new EventEmitter();

// emitter.on("data", (msg) => {
//   console.log("Listener 1:", msg);
// });

// emitter.on("data", (msg) => {
//   console.log("Listener 2:", msg);
// });

// emitter.emit("data", "hello");
// emitter.emit("data", "world");

// Listener 1: hello
// Listener 2: hello
// Listener 1: world
// Listener 2: world

// When an event is emitted, all registered listeners for that event are executed synchronously in the order they were added, for every emit call.

// Q-14 Write a function readLargeFile(filePath) in Node.js that:

// Reads a large file using streams
// Counts the total number of lines in the file
// Prints the count when done
// Handles errors properly

// No fs.readFile() allowed. Must use streams.
// const fs = require("fs");

// const readLargeFile = (filePath) => {
//   let totalLines = 0;
//   let leftOver = "";
//   const stream = fs.createReadStream(filePath, { encoding: "utf-8" });

//   stream.on("data", (chunk) => {
//     let data = leftOver + chunk;
//     let lines = data.split("\n");
//     leftOver = lines.pop();
//     totalLines += lines.length;
//   });

//   stream.on("end", () => {
//     if (leftOver) totalLines++;
//     console.log(
//       `File reading completed, there are total ${totalLines} lines in a file`,
//     );
//   });

//   stream.on("error", (err) => {
//     console.error(err.message);
//   });
// };

// readLargeFile("./sample.txt");

// Q-15 Implement a simple EventEmitter class from scratch in Node.js without using the built-in events module. It should support:

// on(event, listener) — register a listener
// emit(event, ...args) — trigger all listeners
// off(event, listener) — remove a listener
// once(event, listener) — listener fires only one time

// class EventEmitter {
//   constructor() {
//     this.events = {};
//   }

//   on(event, listener) {
//     if (!this.events[event]) {
//       this.events[event] = [];
//     }

//     this.events[event].push(listener);
//   }

//   emit(event, ...args) {
//     if (!this.events[event]) return;

//     this.events[event].forEach((listener) => listener(...args));
//   }

//   off(event, listenerToRemove) {
//     if (!this.events[event]) return;

//     this.events[event] = this.events[event].filter(
//       (listener) => listener !== listenerToRemove,
//     );
//   }

//   once(event, listener) {
//     const wrapper = (...args) => {
//       listener(...args);
//       this.off(event, wrapper);
//     };

//     this.on(event, wrapper);
//   }
// }

// const emitter = new EventEmitter();

// function greet(name) {
//   console.log(`Hello ${name}`);
// }

// // on
// emitter.on("welcome", greet);

// emitter.emit("welcome", "Himanshu");
// // Hello Himanshu

// // once
// emitter.once("login", (user) => {
//   console.log(`${user} logged in`);
// });

// emitter.emit("login", "John");
// // John logged in

// emitter.emit("login", "John");
// // nothing happens

// // off
// emitter.off("welcome", greet);

// emitter.emit("welcome", "Himanshu");
// // nothing happens

// Question 3:
// Write a Node.js function that reads a JSON file, parses it, adds a new field updatedAt with current timestamp to each object in the array, and writes the result back to the file. Handle all errors properly.
// Input file data.json:
// json[
//   { "id": 1, "name": "Alice" },
//   { "id": 2, "name": "Bob" }
// ]

// const { readFile, writeFile } = require("fs").promises;

// async function updateJson(filePath) {
//   try {
//     const fileData = await readFile(filePath, "utf-8");

//     let users;

//     try {
//       users = JSON.parse(fileData);
//     } catch (err) {
//       console.error("Invalid JSON format", err.message);
//       return;
//     }

//     if (!Array.isArray(users)) {
//       console.error("Json Data is not an array");
//       return;
//     }

//     const updatedUsers = users.map((user) => ({
//       ...user,
//       updatedAt: new Date().toISOString(),
//     }));

//     await writeFile(filePath, JSON.stringify(updatedUsers, null, 2), "utf-8");

//     console.log("File updated successfully!");
//   } catch (err) {
//     console.error("Error:", err.message);
//   }
// }

// updateJson("./data.json");

// Implement a promisify function from scratch. It should take a Node.js callback-style function and return a Promise-based version of it.
// javascript// Callback style function
// function readFileCb(path, encoding, callback) {
//     // imagine this reads a file
//     callback(null, 'file contents')
// }

// // After promisify
// const readFilePromise = promisify(readFileCb)
// const data = await readFilePromise('file.txt', 'utf-8')
// console.log(data) // 'file contents'
// Implement promisify.

// Callback style function
// function readFileCb(path, encoding, callback) {
//   // imagine this reads a file
//   callback(null, "file contents");
// }

// function promisify(fn) {
//     return function (...args) {
//       return new Promise((resolve, reject) => {
//         fn(...args, (err, data) => {
//           if (err) reject(err);
//           else resolve(data);
//         });
//       });
//     };
//   }

// Convert into promise version
// const readFilePromise = promisify(readFileCb);

// async function main() {
//   try {
//     const data = await readFilePromise("file.txt", "utf-8");

//     console.log(data);
//   } catch (err) {
//     console.error(err);
//   }
// }

// main();

// Question 5 — Last question of Round 3:
// Implement a rate limiter in Node.js without any external library. It should:

// Allow max 5 requests per minute per IP
// Return 429 Too Many Requests if limit exceeded
// Work as a middleware function for an Express app

// javascript// Usage
// app.use(rateLimiter)
// app.get('/', (req, res) => res.send('Hello'))
// Implement rateLimiter.

// const requestStore = new Map();

// function rateLimiter(req, res, next) {
//   const ip = req.ip;
//   const currentTime = Date.now();

//   const WINDOW_SIZE = 60 * 1000; // 1 minute
//   const MAX_REQUESTS = 5;

//   // First request from IP
//   if (!requestStore.has(ip)) {
//     requestStore.set(ip, {
//       count: 1,
//       startTime: currentTime,
//     });

//     return next();
//   }

//   const userData = requestStore.get(ip);

//   // Check if time window expired
//   if (currentTime - userData.startTime > WINDOW_SIZE) {
//     // Reset counter
//     requestStore.set(ip, {
//       count: 1,
//       startTime: currentTime,
//     });

//     return next();
//   }

//   // Increment request count
//   userData.count++;

//   // Limit exceeded
//   if (userData.count > MAX_REQUESTS) {
//     return res.status(429).send("Too Many Requests");
//   }

//   next();
// }

// const express = require("express");

// const app = express();

// app.use(rateLimiter);

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

// What happens when you do this in Node.js? What is the output and why?
// const obj = { name: "Himanshu" };

// const buf = Buffer.from(JSON.stringify(obj));
// const str = buf.toString("base64");

// console.log(str);

// const decoded = Buffer.from(str, "base64").toString("utf-8");
// console.log(JSON.parse(decoded));
// Also answer — where do you see this pattern in real backend applications?

// const fs = require("fs");

// console.log("A");

// fs.readFile("nonexistent.txt", "utf-8", (err, data) => {
//   console.log("B");
//   process.nextTick(() => console.log("C"));
//   Promise.resolve().then(() => console.log("D"));
// });

// process.nextTick(() => console.log("E"));

// Promise.resolve().then(() => console.log("F"));

// console.log("G");

// const fs = require("fs").promises;

// async function processFiles(files) {
//   const results = [];

//   files.forEach(async (file) => {
//     const data = await fs.readFile(file, "utf-8");
//     results.push(data);
//   });

//   return results;
// }

// processFiles(["a.txt", "b.txt", "c.txt"]).then((results) =>
//   console.log(results),
// );

// Node.js is single threaded — but this code does CPU intensive work. What problem does it cause and how do you fix it?
const { Worker } = require("worker_threads");
const express = require("express");

const app = express();

app.get("/hash", (req, res) => {
  worker.on("message", (data) => {
    res.status(200).send(`result is: ${data}`);
  });

  worker.on("error", (err) => {
    res.status(500).send(err.message);
  });
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// If two users hit /hash and /ping simultaneously — what happens to /ping? Why? What are the three ways to fix this?
