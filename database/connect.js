const { QuickDB, MySQLDriver } = require('quick.db');
  
(async () => {
    const mysql = new MySQLDriver({
        host:  `95.217.74.58`,
        user:  `u168_bbmqblP5Vz`,
        password: `A=PHN.Vaf3yHO3oLS40jAYX=`,
        database: `s168_trollbot-db`
    });
    
    await mysql.connect();

console.log(`Connected To MySQL Database 💾`)
  
const db = new QuickDB({ driver: mysql });

module.export = db;

})();