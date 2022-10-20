const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const ms = require('ms');

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

const times = db.table("times");

 const items = db.table("items");

let register = await settings.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }
    
const sm_settings = interaction.options.getString('setting');

let phone = await items.get(`${user.id}.phone`)

  if (phone === undefined) phone = 0;


if (phone === 0) {
  return interaction.editReply("You Need A Phone To Use This Command. Tip: use /shop and /buy to buy a phone")
}

let timeout = 86400000;

        let sm_timeout = await times.get(`${user.id}.sm_timeout`);

        if (sm_timeout !== undefined && timeout - (Date.now() - sm_timeout) > 0) {
            let time = ms(timeout - (Date.now() - sm_timeout));

            let embedtimeout = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${emojis.cross} You Can Use This Command Only 1 Time Everyday\n\nUse It Again In ${time}`)
          .setFooter({text: `${embeds.footer}`})
          return interaction.editReply({embeds: [embedtimeout]})
        }

    
if (sm_settings === "enable") {

let check_sm = await settings.get(`${user.id}.safemode`)

  if (check_sm === undefined) check_sm = "disable";

if (check_sm === "enable") return interaction.editReply( "safemode is already enabled 🔒")

await settings.set(`${user.id}.safemode`, sm_settings)

await times.set(`${user.id}.sm_timeout`, Date.now())
  
const embed = new EmbedBuilder()
      .setColor(embeds.color)
      .setDescription(`Safemode Enabled Sucessfully 🔒`)
      .setFooter({ text: `${embeds.footer}` });

interaction.editReply({embeds: [embed]})
  
}

if (sm_settings === "disable") {

let check_sm = await settings.get(`${user.id}.safemode`)

  if (check_sm === undefined) check_sm = "disable";

if (check_sm === "disable") return interaction.editReply("safemode is already disabled 🔓")

await settings.set(`${user.id}.safemode`, sm_settings)

await times.set(`${user.id}.sm_timeout`, Date.now())
  
const embed = new EmbedBuilder()
      .setColor(embeds.color)
      .setDescription(`Safemode Disabled Sucessfully 🔓`)
      .setFooter({ text: `${embeds.footer}` });

interaction.editReply({embeds: [embed]})
  
}
    
    
	},
  }