const fs = require('node:fs');
const path = require('node:path');
const { Routes, REST } = require('discord.js');
const { clientId, guildId, token } = require('./config/config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Started Refreshing ${commands.length} Application (/) Commands...`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`➥ Successfully Reloaded ${data.length} Application (/) Commands.`);
	} catch (error) {
		console.error(error);
	}
})();