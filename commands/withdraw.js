const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "././database/database.sqlite" });
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('withdraw')
		.setDescription('💳 withdraw your troll coins from bank')
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
    
let bank = await economy.get(`${user.id}.bank`)

    if (bank === undefined) bank = 0;

    if (bank < ammount) {
                return interaction.editReply({content: `${emojis.cross} You Don't Have That Much Money On Your Bank`, ephemeral: true});
    }

    await economy.add(`${user.id}.balance`, ammount)

    await economy.sub(`${user.id}.bank`, ammount)


    const embed2 = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`You Have Withdrawal 
${emojis.troll_coin} ${ammount} Troll Coins From Your Bank`)
.setFooter({text: `${embeds.footer}`});

    
  return interaction.editReply({embeds: [embed2]});


	},
}