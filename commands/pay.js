const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { developers } = require("./../config/emojis.json");
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('pay')
		.setDescription('💳 pay money to someone')
  .addUserOption(option => option.setName('user').setDescription('Give Me A User To Pay').setRequired(true))
  .addNumberOption(option => option.setName('ammount').setDescription('Give Me A Amount To Pay').setRequired(true))
  .setDMPermission(false),
                   
	async execute(interaction, client) {

const db = require("./../database/connect.js");
    

const currency = db.table("currency");

const settings = db.table("settings")

    
    const user = interaction.options.getUser('user');

    const ammount = interaction.options.getNumber('ammount');

    const user2 = interaction.user;

let register = await settings.get(`${user2.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }
    
let safe_mode1 = await settings.get(`${user1.id}.safemode`)

    if (safe_mode1 === undefined) safe_mode1 = 'false';

if (safe_mode1 === "true") {
  return interaction.editReply("You Can't Pay You Are In Safe Mode")
}
    
let safe_mode = await settings.get(`${user.id}.safemode`)

if (safe_mode === undefined) safe_mode = 'false';

if (safe_mode1 === "true") {
  return interaction.editReply("You Can't Pay That Parson In Safe Mode")
}
    
let balance = await currency.get(`${user2.id}.balance`);

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
    
    await currency.add(`${user.id}.balance`, ammount)
    
await currency.sub(`${user2.id}.balance`, ammount)

    const embed = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`You Paid ${emojis.troll_coin} ${ammount} To ${user.username}`)
.setFooter({text: `${embeds.footer}`});

  return interaction.editReply({embeds: [embed]});
    
	},
}