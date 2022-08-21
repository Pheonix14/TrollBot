const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "././database/database.sqlite" });
const ms = require("ms");
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const Jbeg = require('./../JSON/begs.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('use')
		.setDescription('🏦 use a item')
   .addStringOption(option => option.setName('item').setDescription('Give Me A Item To use').setRequired(true)
  .addChoices(
{ name: 'Bank Upgrader', value: 'bank' },
)),
	async execute(interaction, client) {
  
  await interaction.deferReply();

const economy = db.table("economy");
    
const item = interaction.options.getString('item');

  let bank_upgrader = await economy.get(`${interaction.user.id}.bank_upgrader`)

if (bank_upgrader === undefined) bank_upgrader = 0;

if (item === 'bank') {
  
if (bank_upgrader < 1) return interaction.editReply({content: "You didn't Have A Bank Upgrader To Use", ephemeral: true })

const random = Math.floor(Math.random() * (110000 -  + 80000)) + 80000;
  
  await economy.add(`${interaction.user.id}.bank_space`, random)


await economy.sub(`${interaction.user.id}.bank_upgrader`, 1)
  
  let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`You Used A Bank Upgrader ${emojis.bank_upgrader} And Got ${emojis.troll_coin} ${random} Bank Space`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embed1]})
}

	},
}