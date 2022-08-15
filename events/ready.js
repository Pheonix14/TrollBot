module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`[bot-handler] Status: Ready! Logged In As ${client.user.tag} 💻`);
	},
};