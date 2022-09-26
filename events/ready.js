
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
	console.log(`Logged In As ${client.user.tag}`);
	},
};