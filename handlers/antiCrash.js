module.exports = client => {
   process.on('unhandledRejection', (reason, p) => {
        console.log('\x1b[31m',' [antiCrash] :: Unhandled Rejection/Catch','\x1b[0m');
        console.log(reason, p);
    });
    process.on("uncaughtException", (err, origin) => {
        console.log('\x1b[31m',' [antiCrash] :: Uncaught Exception/Catch','\x1b[0m');
        console.log(err, origin);
    }) 
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log('\x1b[31m',' [antiCrash] :: Uncaught Exception/Catch (MONITOR)','\x1b[0m');
        console.log(err, origin);
    });
    process.on('multipleResolves', (type, promise, reason) => {
        console.log('\x1b[31m',' [antiCrash] :: Multiple Resolves','\x1b[0m');
        console.log(type, promise, reason);
    });
}