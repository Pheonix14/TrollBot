const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "././database/database.sqlite" });
const ms = require("ms");
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const Jwork = require('./../JSON/works.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('work')
		.setDescription('👷 work and earn troll coins'),
                   
	async execute(interaction, client) {

    const JworkR = Jwork[Math.floor(Math.random() * Jwork.length)];

    const reward = Math.floor(Math.random() * (2000 -  + 750)) + 750;

  let user = interaction.user;

        let timeout = 3600000;
        let amount = reward;

        let daily = await db.get(`${user.id}.work`);

        if (daily !== undefined && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${emojis.cross} You've Already Worked And Collected Reward\n\nWork Again In ${time}`)
          .setFooter({text: `${embeds.footer}`})
            interaction.reply({embeds: [embed1]})
        } else {
            let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${JworkR} ${emojis.troll_coin} ${amount}`)
          .setFooter({text: `${embeds.footer}`});
            
interaction.reply({embeds: [embed2]})

          await db.add(`${user.id}.works`, 1)
            await db.add(`${user.id}.balance`, amount)
            await db.set(`${user.id}.work`, Date.now())


              }


	},
            }