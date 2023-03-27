const path = require('path')
const fs = require('fs')

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/PRIVATE.KEY'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/PUBLIC.KEY'))

module.exports = {
  PRIVATE_KEY,
  PUBLIC_KEY
}