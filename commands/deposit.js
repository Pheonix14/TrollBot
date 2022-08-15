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

let balance = await economy.get(`${user.id}.balance`)
    
if (balance === undefined) balance = 0;

    
    if (balance < ammount) {
                return interaction.editReply({content: `${emojis.cross} You Don't Have That Much Money On Your Pocket`, ephemeral: true});
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