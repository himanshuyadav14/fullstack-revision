const express = require("express");
const cluster = require("cluster");
const os = require("os");

// cluster.isPrimary = true  → main/master process (workers create karta hai)
// cluster.isPrimary = false → worker process (actual server yahan chalta hai)
const isPrimary = cluster.isPrimary ?? cluster.isMaster;

if (isPrimary) {
  // CPU cores jitne workers fork karo — har core ek worker use kar sake
  const numCPUs = os.cpus().length;
  console.log(`Primary process ${process.pid} is running`);
  console.log(`Forking ${numCPUs} workers...\n`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // jab naya worker start ho
  cluster.on("online", (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  // agar koi worker crash ho jaye to naya worker spawn karo
  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died (code: ${code}, signal: ${signal})`
    );
    console.log("Starting a new worker...");
    cluster.fork();
  });
} else {
  // har worker apna alag Express server banata hai
  const app = express();

  app.get("/", (req, res) => {
    // response me pid dikhao — refresh karoge to alag workers dikhenge
    res.send(
      `Hello from worker PID: ${process.pid} (handled by CPU core efficiently)`
    );
  });

  // sab workers same port share karte hain — OS cluster module load balance karta hai
  app.listen(3000, () => {
    console.log(`Worker ${process.pid} started on http://localhost:3000`);
  });
}
