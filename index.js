const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Partials, InteractionType, ActivityType } = require('discord.js');
const { token, activitystatus, activitystatus2 } = require('./config/config.json');
const settings = require('./config/settings.json')


const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel]
});

//command handler

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



client.once('ready', () => {
	console.log(`\x1b[32m`,'[system] Status: Ready ✅', `\x1b[0m`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.type === InteractionType.ApplicationCommand) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
	await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

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

["modals", settings.antiCrash ? "antiCrash" : null, ]
    .filter(Boolean)
    .forEach(h => {
        require(`./handlers/${h}`)(client);
    })

require('./database/connect.js');

client.login(token);