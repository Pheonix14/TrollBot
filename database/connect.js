const { QuickDB, MySQLDriver } = require('quick.db');
(async () => {
    const mysql = new MySQLDriver({
        host:     'n1.artiom.host',
        user:     'u2496_5lKM6PND5J',
        password: 'G+P=i23Ohp5Wf^HtxT=6WcOM',
        database: 's2496_testing-db'
    });

    await mysql.connect().then(() => {
      console.log("Connected To Database")
    })
.catch((err) => { console.error(err);

});

  
module.exports = new QuickDB({ driver: mysql });


})();