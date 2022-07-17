const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { token, activitystatus, activitystatus2 } = require('./config/config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


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

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('[system] Status: Ready ✅');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('ready', () => { 
    setInterval(() => {

        const statuses = [
            `/help | ${client.guilds.cache.size} Servers ${client.users.cache.size} Users`, 
          `${activitystatus}`, 

     `${activitystatus2}`
        ]

        const status = statuses[Math.floor(Math.random() * statuses.length)] 
        client.user.setActivity(status, { type: "STREAMING" }) 
    }, 

            20000) 

});


require('./database/connect.js')

client.login(token);