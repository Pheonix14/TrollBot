const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
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

const db = require("./../database/connect.js");
    

const currency = db.table("currency");

const settings = db.table("settings");

const times = db.table("times");

const counts = db.table("counts");

const titles = db.table("titles");

    const bet = interaction.options.getNumber('bet');

let choose = interaction.options.getString('choose');
    
  let user = interaction.user;

let register = await settings.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }

let timeout = 25000;

        let coinflip = await times.get(`${user.id}.coinflip`);

        if (coinflip !== undefined && timeout - (Date.now() - coinflip) > 0) {
            let time = ms(timeout - (Date.now() - coinflip));

            let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${emojis.cross} You Just Just Flip A Coin\n\nFlip Again In ${time}`)
          .setFooter({text: `${embeds.footer}`})
          return interaction.editReply({embeds: [embed1]})
        } 

    
        let amount = bet;
    let balance = await currency.get(`${user.id}.balance`);

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
    

if (choose !== coins[coinb]) {
            let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`You Spend ${emojis.troll_coin} ${bet} And Choose ${choose}
The Coin Spins... ${coins[coinb]} And You Lost It All`)
          .setFooter({text: `${embeds.footer}`});
            
interaction.editReply({embeds: [embed2]})

          await counts.add(`${user.id}.flips`, 1)
            await currency.sub(`${user.id}.balance`, amount)
await times.set(`${user.id}.coinflip`, Date.now())
}


   if (choose === coins[coinb]) {

            
            let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`You Spend ${emojis.troll_coin} ${bet} And Choose ${choose}
The Coin Spins... ${coins[coinb]} And You Won ${emojis.troll_coin} ${betw}`)
          .setFooter({text: `${embeds.footer}`});
            
interaction.editReply({embeds: [embed2]})

          await counts.add(`${user.id}.flips`, 1)
            await currency.add(`${user.id}.balance`, amount)
     await times.set(`${user.id}.coinflip`, Date.now())

let title_gambler = await titles.get(`${user.id}.gambler`)
  
if (title_gambler === undefined) title_gambler = "false";

if (title_gambler === 'false') {
  await titles.set(`${user.id}.gambler`, 'true')

let embedtit = new EmbedBuilder() 
  
  .setColor(embeds.color)
          .setTitle(`**Title Unlocked ⭐**`)
          .setDescription(`You Got **Pro Gambler** title`)
          .setFooter({text: `tips: use /settings-title to equip it.`});

interaction.followUp({embeds: [embedtit], ephemeral: true}) 
}

          } 
     


    
	},
}