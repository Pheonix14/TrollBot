module.exports = {
	name: 'ShardReady',
  once: true,
	execute(client, id) {
		console.log(`\x1b[32m`,`|| <==> || [${String(new Date).split(" ", 5).join(" ")}] || <==> || Shard #${id} Ready || <==> ||`,`\x1b[0m`)
	},
};