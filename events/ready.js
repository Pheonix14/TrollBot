
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
	console.log(`➥ Logged in as ${client.user.tag}`);
    console.log(`Now Bot Ready To Interact With Discord`);
	},
};