const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "././database/database.sqlite" });
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
    
  await interaction.deferReply();

    const economy = db.table("economy");
    
    const user = interaction.options.getUser('user');

    const ammount = interaction.options.getNumber('ammount');

    if (interaction.user.id ==! developers) return interaction.reply({content: 'You Are Not My Developer', ephemeral: true})

    await economy.add(`${user.id}.balance`, ammount)
    
let bal = await economy.get(`${user.id}.balance`)

    const embed = new EmbedBuilder()
  .setColor(embeds.color)
  .setDescription(`Added ${emojis.troll_coin} ${ammount} troll coins\n\nNew Balance: ${emojis.troll_coin} ${bal}`)
.setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embed]});
    
	},
}