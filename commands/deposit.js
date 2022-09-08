const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "././database/database.sqlite" });
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('deposit')
		.setDescription('🏦 deposit your pocket balance to your bank')
  .addNumberOption(option => option.setName('ammount').setDescription('Give Me A Amount To Deposit Money').setRequired(true)),
                   
	async execute(interaction, client) {
await interaction.deferReply();

const economy = db.table("economy");
    
    const ammount = interaction.options.getNumber('ammount');
    const user = interaction.user;

let register = await economy.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }

    
let balance = await economy.get(`${user.id}.balance`)

let bank_space = await economy.get(`${user.id}.bank_space`)

let bank = await economy.get(`${user.id}.bank`)

    
if (balance === undefined) balance = 0;

if (bank_space === undefined) bank_space = 0;

if (bank === undefined) bank = 0;
    
let total = ammount + bank;
    
    if (balance < ammount) {
                return interaction.editReply({content: `${emojis.cross} You Don't Have That Much Money On Your Pocket`, ephemeral: true});
    }

if (bank_space < total) {
                return interaction.editReply({content: `${emojis.cross} You Don't Have That Much Bank Space. Use Bank Upgrader To Increase It`, ephemeral: true});
    }

    
    await economy.add(`${user.id}.bank`, ammount)

    await economy.sub(`${user.id}.balance`, ammount)


    const embed2 = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`You Have Deposited 
${emojis.troll_coin} ${ammount} Troll Coins Into Your Bank`)
.setFooter({text: `${embeds.footer}`});

    
  return interaction.editReply({embeds: [embed2]});


	},
}