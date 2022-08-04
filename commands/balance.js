const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "././database/database.sqlite" });
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('💸 balance. economy command')
  .addUserOption(option => option.setName('user').setDescription('Give Me A User').setRequired(true)),
                   
	async execute(interaction, client) {

    const user = interaction.options.getUser('user');

let bal = await db.get(`${user.id}.balance`)

if (bal === undefined) bal = 0;

let bank = await db.get(`${user.id}.bank`)
    
if (bank === undefined) bank = 0;

let Total = bal + bank

    const embed = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`**${user.username}'s Balance**\n**Cash:** ${bal}$\n**Bank:** ${bank}\n**Total:** ${Total}`)
.setFooter({text: `${embeds.footer}`});

  return interaction.reply({embeds: [embed]});


	},
}