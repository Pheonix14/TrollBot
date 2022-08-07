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
  .addNumberOption(option => option.setName('bet').setDescription('Give Me A Amount You Want To Bet').setRequired(true)),
                   
	async execute(interaction, client) {

    const bet = interaction.options.getNumber('bet');
    
  let user = interaction.user;

        
        let amount = bet;
    let balance = await db.get(`${user.id}.balance`);

    let betw = bet + bet

    const coins = ["Heads", "Tails"];
    
    let coinc = Math.floor(Math.random() * coins.length);

    let coinb = Math.floor(Math.random() * coins.length);


    if (balance < amount) {
                return interaction.reply({content: `${emojis.cross} You Don't Have That Much Money To Bet`, ephemeral: true});
    }

    if (amount < 1000) {
                return interaction.reply({content: `${emojis.cross} You Can't Bet Lower Than 1000`, ephemeral: true});
    }
        
   if (coins[coinc] === coins[coinb]) {

            
            let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`You Spend ${emojis.troll_coin} ${bet} And Choose ${coins[coinc]}
The Coin Spins... ${coins[coinb]} And You Won ${emojis.troll_coin} ${betw}`)
          .setFooter({text: `${embeds.footer}`});
            
interaction.reply({embeds: [embed2]})

          await db.add(`${user.id}.flips`, 1)
            await db.add(`${user.id}.balance`, amount)
          } 
     
else {
            let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`You Spend ${emojis.troll_coin} ${bet} And Choose ${coins[coinc]}
The Coin Spins... ${coins[coinb]} And You Lost It All`)
          .setFooter({text: `${embeds.footer}`});
            
interaction.reply({embeds: [embed2]})

          await db.add(`${user.id}.flips`, 1)
            await db.sub(`${user.id}.balance`, amount)
}
        

	},
}