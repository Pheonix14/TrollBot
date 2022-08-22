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

    
await interaction.deferReply();

const economy = db.table("economy");
    
    const user = interaction.options.getUser('user');

    const ammount = interaction.options.getNumber('ammount');

    const user2 = interaction.user;

let register = await economy.get(`${user2.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }

    
let balance = await economy.get(`${user2.id}.balance`);

if (balance === undefined) balance = 0;
    
if (user.id === user2.id) {
      return interaction.editReply({content: `${emojis.cross} You Can't pay to yourself`, ephemeral: true});
}
    if (user.id === user2.bot) {
      return interaction.editReply({content: `${emojis.cross} You Can't pay to a bot`, ephemeral: true});
    }

  if (balance < ammount) {
      return interaction.editReply({content: `${emojis.cross} You don't have that much money`, ephemeral: true});
  }
    
    await economy.add(`${user.id}.balance`, ammount)
    
await economy.sub(`${user2.id}.balance`, ammount)

    const embed = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`You Paid ${emojis.troll_coin} ${ammount} To ${user.username}`)
.setFooter({text: `${embeds.footer}`});

  return interaction.editReply({embeds: [embed]});
    
	},
}