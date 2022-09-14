const { ShardingManager } = require('discord.js');
const { token } = require('./config/config.json')
const manager = new ShardingManager('./index.js', { token: `${token}` });

manager.on('shardCreate', shard => console.log(`\x1b[32m`,`[sharder] Status: Launched Shard ${shard.id} 🚀`,`\x1b[0m`));

manager.spawn();