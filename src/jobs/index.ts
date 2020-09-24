/* eslint-disable @typescript-eslint/no-var-requires */
import path = require('path');

function main() {
  const file = process.argv[2];
  const jobPath = path.join(__dirname, file.replace(`.js`, ''));
  try {
    path.resolve(jobPath);
  } catch (err) {}
  const handler = require(path.join(__dirname, file));
  if (handler && typeof handler === 'function') {
    handler();
  } else if (handler.default && typeof handler.default === 'function') {
    handler.default();
  }
}

main();
