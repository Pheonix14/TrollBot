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
    const ammount = interaction.options.getNumber('ammount');
    const user = interaction.user;

let bank = await db.get(`${user.id}.bank`)
  

    if (bank < ammount) {
                return interaction.editReply({content: `${emojis.cross} You Don't Have That Much Money On Your Bank`, ephemeral: true});
    }

    await db.add(`${user.id}.balance`, ammount)

    await db.sub(`${user.id}.bank`, ammount)


    const embed2 = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`You Have Withdrawal 
${emojis.troll_coin} ${ammount} Troll Coins From Your Bank`)
.setFooter({text: `${embeds.footer}`});

    
  return interaction.editReply({embeds: [embed2]});


	},
}