const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ms = require("ms");
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slot')
		.setDescription('🎰 Troll Slots | 4x - rare | 2x - common')
  .addNumberOption(option => option.setName('bet').setDescription('Give Me A Amount You Want To Bet').setRequired(true)),
                   
	async execute(interaction, client) {

const db = require("./../database/connect.js");
    

const currency = db.table("currency");

const settings = db.table("settings");

const times = db.table("times");

const counts = db.table("counts");

    const bet = interaction.options.getNumber('bet');
    
  let user = interaction.user;

let balance = await currency.get(`${user.id}.balance`);
    
let register = await settings.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }

let timeout = 15000;

        let slot = await times.get(`${user.id}.slot`);

        if (slot !== undefined && timeout - (Date.now() - slot) > 0) {
            let time = ms(timeout - (Date.now() - slot));

            let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${emojis.cross} You Just Slotted\n\nSlot Again In ${time}`)
          .setFooter({text: `${embeds.footer}`})
          return interaction.editReply({embeds: [embed1]})
        } 

    
        let money = bet;
    
    if (balance < money) {
                return interaction.editReply({content: `${emojis.cross} You Don't Have That Much Money To Bet`, ephemeral: true});
    }

    if (money < 1000) {
                return interaction.editReply({content: `${emojis.cross} You Can't Bet Lower Than 1000`, ephemeral: true});
    }

if (money > 150000) {
                return interaction.editReply({content: `${emojis.cross} You Can't Bet Higher Than 150000`, ephemeral: true});
}
    
const slotItems = ["🪙", "💸", "💎", "7️⃣", "⚔️"];

let win = false;
    
let number = []
    for (let i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2])  { 
        money *= 4
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 2
        win = true;
    }
if (win) {
  const embed = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won 
${emojis.troll_coin} ${money}`)
  .setFooter({text: `${embeds.footer}`});

interaction.editReply({embeds: [embed] });

await currency.add(`${user.id}.balance`, money)
await times.set(`${user.id}.slot`, Date.now())
await counts.add(`${user.id}.slots`, 1)
} else {
  const embed2 = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${emojis.troll_coin} ${money}`)
  .setFooter({text: `${embeds.footer}`});

interaction.editReply({embeds: [embed2] });

await currency.sub(`${user.id}.balance`, money)
await times.set(`${user.id}.slot`, Date.now())
await counts.add(`${user.id}.slots`, 1)
}
      
	},
      }