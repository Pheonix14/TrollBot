const { QuickDB, MySQLDriver } = require('quick.db');
(async () => {
    const mysql = new MySQLDriver({
        host:     'n1.artiom.host',
        user:     'u2496_5lKM6PND5J',
        password: 'G+P=i23Ohp5Wf^HtxT=6WcOM',
        database: 's2496_testing-db'
    });
    
    await mysql.connect().then(() => {
      console.log("\x1b[32m","[database] Status: Connected To MySQL Server","\x1b[0m")
    })
.catch((err) => { console.log(err);

});

  
module.exports = new QuickDB({ driver: mysql });


})();