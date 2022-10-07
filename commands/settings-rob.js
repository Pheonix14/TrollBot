const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const prices = require("./../JSON/prices.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('settings-rob')
		.setDescription('💰 enable/disable rob on a guild')
   .addStringOption(option => option.setName('setting').setDescription('choose a option').setRequired(true)
  .addChoices(
{ name: 'enable', value: 'enable' },
    { name: 'disable', value: 'disable' },
)),
	async execute(interaction, client) {

const db = require("./../database/connect.js");
    

const user = interaction.user;
    
const guild_settings = db.table("guild_settings");

    
const rob_setting = interaction.options.getString('setting');


if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.editReply(`This Command Only For Admins`)
    
if (rob_setting === "enable") {

let check_rob = await guild_settings.get(`${interaction.guild.id}.rob_setting`)

  if (check_rob === undefined) check_rob = "enable";

if (check_rob === "enable") return interaction.editReply( "rob is already enabled 🔓")

await guild_settings.set(`${interaction.guild.id}.rob_setting`, rob_setting)

const embed = new EmbedBuilder()
      .setColor(embeds.color)
      .setDescription(`Rob Enabled Sucessfully 🔓`)
      .setFooter({ text: `${embeds.footer}` });

interaction.editReply({embeds: [embed]})
  
}

if (rob_setting === "disable") {

let check_rob = await guild_settings.get(`${interaction.guild.id}.rob_setting`)

  if (check_rob === undefined) check_rob = "enable";

if (check_rob === "disable") return interaction.editReply("rob is already disabled 🔒")

await guild_settings.set(`${interaction.guild.id}.rob_setting`, rob_setting)

const embed = new EmbedBuilder()
      .setColor(embeds.color)
      .setDescription(`Rob Disabled Sucessfully 🔒`)
      .setFooter({ text: `${embeds.footer}` });

interaction.editReply({embeds: [embed]})
  
}
    
    
	},
}