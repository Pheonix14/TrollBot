const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "././database/database.sqlite" });
const ms = require("ms");
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coinflip')
		.setDescription('🪙 flip a coin and win some troll coins')
  .addNumberOption(option => option.setName('bet').setDescription('Give Me A Amount You Want To Bet').setRequired(true))
  .addStringOption(option => option.setName('choose').setDescription('choose head or tali')
  .addChoices(
{ name: 'Heads', value: 'Heads' },
    { name: 'Tails', value: 'Tails' },
)),
                   
	async execute(interaction, client) {

    await interaction.deferReply();

const economy = db.table("economy");

    const bet = interaction.options.getNumber('bet');

let choose = interaction.options.getString('choose');
    
  let user = interaction.user;

let register = await economy.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }
    
        let amount = bet;
    let balance = await economy.get(`${user.id}.balance`);

if (balance === undefined) balance = 0;

    let betw = bet + bet

    const coins = ["Heads", "Tails"];
    
    let coinc = Math.floor(Math.random() * coins.length);

    let coinb = Math.floor(Math.random() * coins.length);

if (choose === null) choose = coins[coinc];

    
    if (balance < amount) {
                return interaction.editReply({content: `${emojis.cross} You Don't Have That Much Money To Bet`, ephemeral: true});
    }

    if (amount < 1000) {
                return interaction.editReply({content: `${emojis.cross} You Can't Bet Lower Than 1000`, ephemeral: true});
    }

if (amount > 150000) {
                return interaction.editReply({content: `${emojis.cross} You Can't Bet Higher Than 150000`, ephemeral: true});
}
    
   if (choose === coins[coinb]) {

            
            let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`You Spend ${emojis.troll_coin} ${bet} And Choose ${choose}
The Coin Spins... ${coins[coinb]} And You Won ${emojis.troll_coin} ${betw}`)
          .setFooter({text: `${embeds.footer}`});
            
interaction.editReply({embeds: [embed2]})

          await economy.add(`${user.id}.flips`, 1)
            await economy.add(`${user.id}.balance`, amount)
          } 
     
else {
            let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`You Spend ${emojis.troll_coin} ${bet} And Choose ${choose}
The Coin Spins... ${coins[coinb]} And You Lost It All`)
          .setFooter({text: `${embeds.footer}`});
            
interaction.editReply({embeds: [embed2]})

          await economy.add(`${user.id}.flips`, 1)
            await economy.sub(`${user.id}.balance`, amount)
}

    
	},
}