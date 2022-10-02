const { ActivityType } = require('discord.js');
const settings = require('./../config/settings.json');


module.exports = client => {

client.on('ready', () => {

if (settings.maintanance === "true") {
  return client.user.setPresence({ activities: [{ name: `Bot Under Maintenance`, type: ActivityType.Playing }], status: 'online' })
}
  
setInterval(() => {

        const statuses = [
            `/help | ${client.guilds.cache.size} Servers`, `${settings.presence}`, `${settings.presence2}`
        ]

        const status = statuses[Math.floor(Math.random() * statuses.length)] 
        client.user.setPresence({ activities: [{ name: `${status}`, type: ActivityType.Playing }], status: 'online' }) 
    }, 

            60000) 

})
}