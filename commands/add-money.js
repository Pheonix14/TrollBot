const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { developers } = require("./../config/emojis.json");
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

  await interaction.deferReply();

const currency = db.table("currency");
    
    const user = interaction.options.getUser('user');

if (user.id ==! developers) {
  interaction.editReply(`You Are Not My Developer`)
}
    
    const ammount = interaction.options.getNumber('ammount');
    
    await currency.add(`${user.id}.balance`, ammount)
    
let bal = await currency.get(`${user.id}.balance`)

    const embed = new EmbedBuilder()
  .setColor(embeds.color)
  .setDescription(`Added ${emojis.troll_coin} ${ammount} troll coins\n\nNew Balance: ${emojis.troll_coin} ${bal}`)
.setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embed]});
    
	},
}