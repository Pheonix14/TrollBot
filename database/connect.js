const { QuickDB } = require('quick.db');
const { MongoDriver } = require('quickmongo');

(async () => {

  const driver = new MongoDriver("mongodb+srv://trollbot:trollbot2635361@cluster0.1vltbiw.mongodb.net/?retryWrites=true&w=majority");

driver.connect().then(() => {
    console.log(`Connected to the database!`);
    
});
  
await driver.connect();
  
module.exports = new QuickDB({ driver });

})();