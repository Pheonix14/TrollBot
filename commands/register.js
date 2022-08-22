const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "././database/database.sqlite" });
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('📝 register your account in TrollBot'),
                   
	async execute(interaction, client) {

   await interaction.deferReply();

const user = interaction.user;
    
const economy = db.table("economy");
    
let register = await economy.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'true') {
return interaction.editReply(`${emojis.cross} You Are Already Registered In My Database`)
    }

interaction.editReply(`Registering Your Account In My Database. Please Wait...`)

await economy.set(`${user.id}.register`, 'true')

await economy.add(`${user.id}.bank_space`, 5000)

const embed = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`✅ You Are Now Registered In My Database`)
.setFooter({text: `${embeds.footer}`});

  await interaction.editReply({embeds: [embed], content: ''});

  },

}