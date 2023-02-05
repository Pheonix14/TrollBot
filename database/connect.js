const { QuickDB } = require('quick.db');
const { MongoDriver } = require('quickmongo');
const config = require("./../config/config.json");

(async () => {

  const driver = new MongoDriver(config.bot.MongoURI);
  
console.log('Connecting To Database...')
await driver.connect();
console.log("➥ Connected To Database")
  
module.exports = new QuickDB({ driver });

})();