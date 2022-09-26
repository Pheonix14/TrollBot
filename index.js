const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Partials, InteractionType, ActivityType } = require('discord.js');
const { token, activitystatus, activitystatus2 } = require('./config/config.json');
const settings = require('./config/settings.json')
require( 'console-stamp' )( console, {
    format: ':date(yyyy/mm/dd HH:MM:ss).blue :label(1)'
} );



const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel]
});

//command collector

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

//events handler

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


//activity status

client.on('ready', () => { 
    setInterval(() => {

        const statuses = [
            `/help | ${client.guilds.cache.size} Servers ${client.users.cache.size} Users`, 
          `${activitystatus}`, 

     `${activitystatus2}`
        ]

        const status = statuses[Math.floor(Math.random() * statuses.length)] 
        client.user.setPresence({ activities: [{ name: `${status}`, type: ActivityType.Playing }], status: 'online' }) 
    }, 

            40000) 

});


//antiCrash

["modals", "commands", settings.antiCrash ? "antiCrash" : null, ]
    .filter(Boolean)
    .forEach(h => {
        require(`./handlers/${h}`)(client);
    })

require('./database/connect.js');

client.login(token);