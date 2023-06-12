// const fs = require('fs');
// const crypto = require('crypto');
import fs from 'fs'
import crypto from 'crypto'
import { getCounter } from '../../../subscription/subscription.js';
// Encrypt and store the data object in a text file
function encryptCache(key_id){
    var temp=decryptCache()
    var counter=temp?.counter || 0
    const data = { key: key_id,counter: counter+getCounter(),total_count:2}; // need to make an api call to get 
    const encryptionKey = 'myEncryptionKey';
    
    // Encrypt the data
    const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
    let encryptedData = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    
    // Store the encrypted data in a text file
    fs.writeFileSync('./bpp/shared/utils/cache/output.txt', encryptedData, 'utf8');
    return true
}

function decryptCache(){
// Read and decrypt the data from the text file
const encryptedDataFromFile = fs.readFileSync('./bpp/shared/utils/cache/output.txt', 'utf8');
// console.log("-----",encryptedDataFromFile)
const encryptionKey = 'myEncryptionKey';

// Decrypt the data
const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
let decryptedData = decipher.update(encryptedDataFromFile, 'hex', 'utf8');
if(decryptedData){
decryptedData += decipher.final('utf8');
}else{
    return undefined
}

// Parse the decrypted data
const decryptedObject = JSON.parse(decryptedData);
return decryptedObject
}


export {encryptCache,decryptCache}