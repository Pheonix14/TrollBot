const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const settings = require("./../config/settings.json");
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-money')
		.setDescription('💰 add money. developer only')
  .addUserOption(option => option.setName('user').setDescription('Give Me A User').setRequired(true))
  .addNumberOption(option => option.setName('ammount').setDescription('Give Me A Amount To Add Money').setRequired(true)),
                   
	async execute(interaction, client) {
    

const db = require("./../database/connect.js");


const currency = db.table("currency");
const items = db.table("items");
const ban = db.table("ban");
    
    const user = interaction.options.getUser('user');

if (user.id ==! settings.admins) {
  interaction.editReply(`You Are Not My Developer`)
}
    
    const ammount = interaction.options.getNumber('ammount');
    
    await items.add(`${user.id}.starter_kit`, 1)
    
let bal = await currency.get(`${user.id}.balance`)

    const embed = new EmbedBuilder()
  .setColor(embeds.color)
  .setDescription(`Added ${emojis.troll_coin} ${ammount} troll coins\n\nNew Balance: ${emojis.troll_coin} ${bal}`)
.setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embed]});
    
	},
}