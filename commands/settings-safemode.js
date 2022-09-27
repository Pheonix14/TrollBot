const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const prices = require("./../JSON/prices.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('settings-safemode')
		.setDescription('🔒 enable/disable safemode')
   .addStringOption(option => option.setName('setting').setDescription('choose a option').setRequired(true)
  .addChoices(
{ name: 'enable', value: 'enable' },
    { name: 'disable', value: 'disable' },
)),
	async execute(interaction, client) {

const db = require("./../database/connect.js");
    
  

const user = interaction.user;
    
const settings = db.table("settings");


let register = await settings.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }
    
const sm_settings = interaction.options.getString('setting');

if (sm_settings === "enable") {

let check_sm = await settings.get(`${user.id}.safemode`)

  if (check_sm === undefined) check_sm = "disable";

if (check_sm === "enable") return interaction.editReply( "safemode is already enabled 🔒")

await settings.set(`${user.id}.safemode`, sm_settings)

const embed = new EmbedBuilder()
      .setColor(embeds.color)
      .setDescription(`Safemode Enabled Sucessfully 🔒`)
      .setFooter({ text: `${embeds.footer}` });

interaction.editReply({embeds: [embed]})
  
}

if (sm_settings === "disable") {

let check_sm = await settings.get(`${user.id}.safemode`)

  if (check_sm === undefined) check_sm = "disable";

if (check_sm === "disable") return interaction.editReply( "safemode is already disabled 🔓")

await settings.set(`${user.id}.safemode`, sm_settings)

const embed = new EmbedBuilder()
      .setColor(embeds.color)
      .setDescription(`Safemode Disabled Sucessfully 🔓`)
      .setFooter({ text: `${embeds.footer}` });

interaction.editReply({embeds: [embed]})
  
}
    
    
	},
}