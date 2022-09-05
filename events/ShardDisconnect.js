module.exports = {
	name: 'shardDisconnect',
	execute(client, event, id) {
		console.log(`\x1b[31m`,`|| <==> || [${String(new Date).split(" ", 5).join(" ")}] || <==> || Shard #${id} Disconnected || <==> ||`,`\x1b[0m`)
	},
};