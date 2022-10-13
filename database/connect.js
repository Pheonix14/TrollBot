const { QuickDB } = require('quick.db');
const { MongoDriver } = require('quickmongo');
const config = require("./../config/config.json");

(async () => {

  const driver = new MongoDriver(config.MongoURI);

driver.connect().then(() => {
    console.log(`Connected to the database!`);
    
});
  
await driver.connect();
  
module.exports = new QuickDB({ driver });

})();