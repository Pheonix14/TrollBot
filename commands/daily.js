const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "././database/database.sqlite" });
const ms = require("ms");
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('🎁 collect your daily reward'),
                   
	async execute(interaction, client) {

  let user = interaction.user;

        let timeout = 86400000;
        let amount = 5000;

        let daily = await db.get(`${user.id}.daily`);

        if (daily !== undefined && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${emojis.cross} You've Already Collected Your Daily Reward\n\nCollect It Again In ${time}`)
          .setFooter({text: `${embeds.footer}`})
            interaction.reply({embeds: [embed1]})
        } else {
            let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`You've Collected Your Daily Reward Of ${emojis.troll_coin} ${amount} Troll Coins`)
          .setFooter({text: `${embeds.footer}`});
            
interaction.reply({embeds: [embed2]})

            await db.add(`${user.id}.balance`, amount)
            await db.set(`${user.id}.daily`, Date.now())


              }


	},
}