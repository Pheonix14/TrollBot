const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, version } = require("discord.js");
const embeds = require("./../config/embed.json");
const emojis = require("./../config/emojis.json");
const os = require('node:os');
const cpuStat = require("cpu-stat")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('botinfo')
		.setDescription("Info About Bot's System 📜"),
	async execute(interaction, client) {

    let cpuLol;
  cpuStat.usagePercent(function(err, percent ) {
      if (err) {
          return console.log(err);
      }

    let days = Math.floor(interaction.client.uptime / 86400000);
    let hours = Math.floor(interaction.client.uptime / 3600000) % 24;
    let minutes = Math.floor(interaction.client.uptime / 60000) % 60;
    let seconds = Math.floor(interaction.client.uptime / 1000) % 60;

    let day = Math.floor(os.uptime() / 86400);
    let hour = Math.floor(os.uptime() / 3600) % 24;
    let minute = Math.floor(os.uptime() / 60) % 60;
    let second = Math.floor(os.uptime() / 1) % 60;
    

 const embed = new MessageEmbed()
  .setColor(embeds.color)
    .setTitle(`__${interaction.client.user.username}'s System Info:__`)
.setDescription(`${emojis.ram} **Memory Usage** - ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / 1 GB


${emojis.djs} **Discord.js** - v${version}

${emojis.nodejs} **NodeJs** - ${process.version}

${emojis.cpu} **CPU** - ${os.cpus().map(i => `${i.model}`)[0]}

${emojis.cpu} **CPU Usage** - ${percent.toFixed(2)}%

${emojis.cpu} **CPU Speed** - ${os.cpus().map(i => `${i.speed}`)[0]}MHz

${emojis.cpu} **Arch** - ${os.arch()}

${emojis.linux} **Platform** - ${os.platform()}

${emojis.discord} **API Latency** - ${(interaction.client.ws.ping)}ms

${emojis.bot} **Bot Uptime** - ${days}d ${hours}h ${minutes}m ${seconds}s

${emojis.server} **Server Uptime** - ${day}d ${hour}h ${minute}m ${second}s
ㅤ`)
  .setFooter({text: `${embeds.footer}`});

	return interaction.reply({embeds: [embed] });

   })
  },
};