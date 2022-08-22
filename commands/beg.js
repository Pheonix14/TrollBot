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

    await interaction.deferReply();

const economy = db.table("economy");
    
const JbegR = Jbeg[Math.floor(Math.random() * Jbeg.length)];
    
    const reward = Math.floor(Math.random() * (300 -  + 75)) + 75;

  let user = interaction.user;

let register = await economy.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }

    
        let timeout = 60000;
        let amount = reward;

        let daily = await economy.get(`${user.id}.beg`);

        if (daily !== undefined && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${emojis.cross} You Just Begged To Someone And Earned Some Money\n\nBeg Again In ${time}`)
          .setFooter({text: `${embeds.footer}`})
            interaction.editReply({embeds: [embed1]})
        } else {
            let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${JbegR} ${emojis.troll_coin} ${amount}`)
          .setFooter({text: `${embeds.footer}`});
            
interaction.editReply({embeds: [embed2]})

          await economy.add(`${user.id}.begs`, 1)
            await economy.add(`${user.id}.balance`, amount)
            await economy.set(`${user.id}.beg`, Date.now())


              }


	},
}