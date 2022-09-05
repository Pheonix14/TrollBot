module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`\x1b[32m`,`[event] Status: Ready! Logged In As ${client.user.tag}`, `\x1b[0m`);
	},
};