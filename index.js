const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config/config.json');
const settings = require('./config/settings.json')


// Gateway Intent Bits

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

//events handler

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
console.log(`Loading Events...`);
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
  console.log(`➥ Loaded ${event.name} Event`)
}

//command collector

client.commands = new Collection();

console.log(`Loading Commands...`);

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
console.log(`➥ Loaded ${command.data.name} Command`)

}

// handler manager
console.log(`Loading Handlers...`);
["modals", "context-menu", "presence", "commands", settings.antiCrash ? "antiCrash" : null, ]
    .filter(Boolean)
    .forEach(h => {
        require(`./handlers/${h}`)(client);
      console.log(`➥ Loaded ${h} Handler`);
    });

console.log(`Loading Component Handlers...`);
["dig", "fish"]
    .filter(Boolean)
    .forEach(c => {
        require(`./component-handlers/${c}`)(client);
      console.log(`➥ Loaded ${c} Component Handlers`);
    });

// database connection
require('./database/connect.js');

// login to the bot

console.log(`Logging Into To The Bot...`)

client.login(token);

// refresh commands
require('./deploy-commands.js');