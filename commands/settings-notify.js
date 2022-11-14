const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('settings-notify')
		.setDescription('🔕 (enable/disable) dm notifications from the bot')
   .addStringOption(option => option.setName('setting').setDescription('choose a option').setRequired(true)
  .addChoices(
{ name: 'enable', value: 'enable' },
    { name: 'disable', value: 'disable' },
)),
	async execute(interaction, client) {

const db = require("./../database/connect.js");

const user = interaction.user;
    
const settings = db.table('settings')

const items = db.table("items");
    
let register = await settings.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`**${emojis.cross} Use /register To Register Your Account In My Database**`)
    }
    
const noti_settings = interaction.options.getString('setting');

    let phone = await items.get(`${user.id}.phone`)

  if (phone === undefined) phone = 0;


if (phone === 0) {
  return interaction.editReply("**You Need A Phone To Use This Command. Tip: use /shop and /buy to buy a phone**")
}

  if (noti_settings === "enable") {

let check_noti = await settings.get(`${user.id}.notification`)

  if (check_noti === undefined) check_noti = "enable";

if (check_noti === "enable") return interaction.editReply("**Dm notification is already enabled 🔔**")

await settings.set(`${user.id}.notification`, noti_settings)

  
const embed = new EmbedBuilder()
      .setColor(embeds.color)
      .setDescription(`**Dm Notification Enabled Sucessfully 🔔**`)
      .setFooter({ text: `${embeds.footer}` });

interaction.editReply({embeds: [embed]})
  
}

if (noti_settings === "disable") {

let check_noti = await settings.get(`${user.id}.notification`)

  if (check_noti === undefined) check_noti = "enable";

if (check_noti === "disable") return interaction.editReply("**Dm notification is already disabled 🔕**")

await settings.set(`${user.id}.notification`, noti_settings)

  
const embed = new EmbedBuilder()
      .setColor(embeds.color)
      .setDescription(`**Dm Notification Disabled Sucessfully 🔕**`)
      .setFooter({ text: `${embeds.footer}` });

interaction.editReply({embeds: [embed]})
  
}

	},
}