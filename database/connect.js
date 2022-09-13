const { QuickDB, MySQLDriver } = require('quick.db');
(async () => {
    const mysql = new MySQLDriver({
        host:     '95.217.74.58',
        user:     'u413_MCbCTfplFV',
        password: '0J@qI1CVYu!v!vrgJQS2+9yk',
        database: 's413_trollbot'
    });
    
    await mysql.connect();
  
module.exports = new QuickDB({ driver: mysql });


})();