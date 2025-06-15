const crypto = require('crypto');
// create key
const key = crypto.randomBytes(32).toString('hex')

console.table({key});