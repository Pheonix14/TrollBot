const { EmbedBuilder, version, SlashCommandBuilder } = require("discord.js");
const embeds = require("./../config/embed.json");
const emojis = require("./../config/emojis.json");
const os = require('node:os');
const cpuStat = require("cpu-stat")
const ms = require("ms");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription("📶 Bot Latency"),
	async execute(interaction, client) {

    
    let cpuLol;
  cpuStat.usagePercent(function(err, percent ) {
      if (err) {
          return console.log(err);
      }

    const uptime = interaction.client.uptime;

  let uptime_calc = ms(uptime);
    
 const embed = new EmbedBuilder()
  .setColor(embeds.color)
    .setTitle(`TrollBot Status:`)
.setDescription(`${emojis.online} Shard [0]:

${emojis.wifi} Latency: ${interaction.client.ws.ping}ms

${emojis.bot} Uptime: ${uptime_calc}

${emojis.ram} RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB

${emojis.cpu} CPU Usage: ${percent.toFixed(2)}%`)
  .setFooter({text: `${embeds.footer}`});

	return interaction.editReply({embeds: [embed] });

   })
  },
};