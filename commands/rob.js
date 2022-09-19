const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('rob')
		.setDescription('🥷 rob someone')
  .addUserOption(option => option.setName('user').setDescription('Give Me A User To Rob').setRequired(true)),
                   
	async execute(interaction, client) {

const db = require("./../database/connect.js");

    await interaction.deferReply();

    const currency = db.table("currency");
    
const settings = db.table("settings");

const guild_settings = db.table("guild_settings");

const times = db.table("times");

const user = interaction.options.getUser('user');

const user1 = interaction.user;
    
let register = await settings.get(`${user1.id}.register`)
    
if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }

let timeout = 25000;

        let rob = await times.get(`${user1.id}.rob`);

        if (rob !== undefined && timeout - (Date.now() - rob) > 0) {
            let time = ms(timeout - (Date.now() - rob));

            let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${emojis.cross} You Just Robbed A Parson\n\nRob Again In ${time}`)
          .setFooter({text: `${embeds.footer}`})
          return interaction.editReply({embeds: [embed1]})
        }
    

let safe_mode1 = await settings.get(`${user1.id}.safe_mode`)

    if (safe_mode1 === undefined) safe_mode1 = 'false';

if (safe_mode1 === "true") {
  return interaction.editReply("You Can't Rob You Are In Safe Mode")
}
    
let safe_mode = await settings.get(`${user.id}.safe_mode`)

if (safe_mode === undefined) safe_mode = 'false';

if (safe_mode1 === "true") {
  return interaction.editReply("You Can't Rob That Parson In Safe Mode")
}

let rob_guild = await settings.get(`${interaction.guild.id}.rob`)

if (rob_guild === undefined) rob_guild = 'true';

if (rob_guild === "false") {
  return interaction.editReply("Rob Is Not Allow In This Server")
}
    
let balance1 = await currency.get(`${user1.id}.balance`)

let balance = await currency.get(`${user.id}.balance`)

if (balance1 < 5000) {
  return interaction.editReply(`You Need Atleast ${emojis.troll_coin} 5000 To Rob Someone`)
}
    
if (balance < 5000) {
  return interaction.editReply(`That Parson Didn't Have Atleast ${emojis.troll_coin} 5000. it's not worth it men`)
}



	},
}