// File to be run only once to create the private and the public key using in-built crypto library
const crypto = require("crypto");

// file system to store the keys in files
const fs = require("fs");

function genKeyPair() {
  // Function that creates a set of public and private keys in pem format
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  // Save the keys in different files
  fs.writeFileSync(__dirname + "/../keys" + "/id_rsa_pub.pem", keyPair.publicKey);
  fs.writeFileSync(__dirname + "/../keys/" + "id_rsa_pri.pem", keyPair.privateKey);
}

genKeyPair();
