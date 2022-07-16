const mongoose = require("mongoose");
const { mongodb } = require("./../config/config.json");

mongoose
.connect (mongodb, { useNewUrlParser: true, useUnifiedTopology: true
})

.then(() => {

console.log("[database] Status: Connected to the database ✅");

})

.catch((err) => { console.log(err);

}); 
