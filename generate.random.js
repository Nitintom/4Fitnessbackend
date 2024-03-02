import crypto from "crypto";

const randomBytes = crypto.randomBytes(32); // 32 bytes = 256 bits
const randomBase64 = randomBytes.toString("base64");

console.log(randomBase64);
