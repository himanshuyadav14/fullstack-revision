const { parentPort } = require("worker_threads");
let result = 0;
for (let i = 0; i < 1_000_000; i++) {
  result += i;
}

parentPort.postMessage(result);
