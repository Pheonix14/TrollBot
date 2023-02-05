const { ActivityType } = require('discord.js');
const config = require('./../config/config.json');


module.exports = client => {

client.on('ready', () => {

if(config.settings.maintenance) {
client.user.setPresence({ activities: [{ name: `Bot Under Maintenance`, type: ActivityType.Playing }], status: 'online' })

} else {
  
setInterval(() => {

        const statuses = [
            `/help | ${client.guilds.cache.size} Servers`, `${config.settings.presence}`, `${config.settings.presence2}`
        ]

        const status = statuses[Math.floor(Math.random() * statuses.length)] 
        client.user.setPresence({ activities: [{ name: `${status}`, type: ActivityType.Playing }], status: 'online' }) 
    }, 

            60000) 
}
})
}