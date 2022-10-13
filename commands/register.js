const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('📝 register your account in TrollBot'),
                   
	async execute(interaction, client) {

    const db = require("./../database/connect.js");


const currency = db.table("currency");
    
const settings = db.table("settings");

const times = db.table("times");

const items = db.table("items");

const user = interaction.user;
    
    
let register = await settings.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'true') {
return interaction.editReply(`${emojis.cross} You Are Already Registered In My Database`)
    }

interaction.editReply(`Registering Your Account In My Database. Please Wait...`)

await settings.set(`${user.id}.register`, 'true')

await times.set(`${user.id}.joined`, Date.now())
    
await currency.add(`${user.id}.bank_space`, 5000)

await items.add(`${user.id}.starter_kit`, 1)
    
const embed = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`✅ You Are Now Registered In My Database

+ 1x ${emojis.starter_kit} Starter Kit

tip: use /use to open kits`)
.setFooter({text: `${embeds.footer}`});

  await interaction.editReply({embeds: [embed], content: ''});

  },

}