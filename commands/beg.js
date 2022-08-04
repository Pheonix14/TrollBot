const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "././database/database.sqlite" });
const ms = require("ms");
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const Jbeg = require('./../JSON/begs.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('beg')
		.setDescription('🥺 beg and earn troll coins'),
                   
	async execute(interaction, client) {

const JbegR = Jbeg[Math.floor(Math.random() * Jbeg.length)];
    
    const reward = Math.floor(Math.random() * (300 -  + 75)) + 75;

  let user = interaction.user;

        let timeout = 60000;
        let amount = reward;

        let daily = await db.get(`${user.id}.beg`);

        if (daily !== undefined && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${emojis.cross} You Just Begged To Someone And Earned Some Money\n\nBeg Again In ${time}`)
          .setFooter({text: `${embeds.footer}`})
            interaction.reply({embeds: [embed1]})
        } else {
            let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${JbegR} ${emojis.troll_coin} ${amount}`)
          .setFooter({text: `${embeds.footer}`});
            
interaction.reply({embeds: [embed2]})

          await db.add(`${user.id}.begs`, 1)
            await db.add(`${user.id}.balance`, amount)
            await db.set(`${user.id}.beg`, Date.now())


              }


	},
}