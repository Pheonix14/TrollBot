const { ShardingManager } = require('discord.js');
const { token } = require('./config/config.json')
const manager = new ShardingManager('./index.js', { token: `${token}` });

manager.on('shardCreate', shard => console.log(`[sharder] Status: Launched Shard ${shard.id} 🚀`));

manager.spawn();