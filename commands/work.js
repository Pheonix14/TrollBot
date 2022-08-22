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
await interaction.deferReply();

const economy = db.table("economy");

    const JworkR = Jwork[Math.floor(Math.random() * Jwork.length)];

    const reward = Math.floor(Math.random() * (2000 -  + 750)) + 750;

  let user = interaction.user;

let register = await economy.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }
    
        let timeout = 3600000;
        let amount = reward;

        let daily = await economy.get(`${user.id}.work`);

        if (daily !== undefined && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${emojis.cross} You've Already Worked And Collected Reward\n\nWork Again In ${time}`)
          .setFooter({text: `${embeds.footer}`})
            interaction.editReply({embeds: [embed1]})
        } else {
            let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${JworkR} ${emojis.troll_coin} ${amount}`)
          .setFooter({text: `${embeds.footer}`});
            
interaction.editReply({embeds: [embed2]})

          await economy.add(`${user.id}.works`, 1)
            await economy.add(`${user.id}.balance`, amount)
            await economy.set(`${user.id}.work`, Date.now())


              }


	},
            }