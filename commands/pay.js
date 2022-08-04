const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "././database/database.sqlite" });
const { developers } = require("./../config/emojis.json");
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('pay')
		.setDescription('💳 pay money to someone')
  .addUserOption(option => option.setName('user').setDescription('Give Me A User To Pay').setRequired(true))
  .addNumberOption(option => option.setName('ammount').setDescription('Give Me A Amount To Pay').setRequired(true)),
                   
	async execute(interaction, client) {

    
    const user = interaction.options.getUser('user');

    const ammount = interaction.options.getNumber('ammount');

    const user2 = interaction.user;

let balance = await db.get(`${user2.id}`);
    
if (user.id === user2.id) {
      return interaction.reply({content: `${emojis.cross} You Can't pay to yourself`, ephemeral: true});
}
    if (user.id === user2.bot) {
      return interaction.reply({content: `${emojis.cross} You Can't pay to a bot`, ephemeral: true});
    }

  if (balance < ammount) {
      return interaction.reply({content: `${emojis.cross} You don't have that much money`, ephemeral: true});
  }
    
    await db.add(`${user.id}.balance`, ammount)
    
await db.sub(`${user2.id}.balance`, ammount)

    const embed = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`You Paid ${emojis.troll_coin} ${ammount} To ${user.username}`)
.setFooter({text: `${embeds.footer}`});

  return interaction.reply({embeds: [embed]});
    
	},
}