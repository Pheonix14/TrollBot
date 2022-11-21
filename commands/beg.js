const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ms = require("ms");
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const Jbeg = require('./../JSON/begs.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('beg')
		.setDescription('🥺 beg and earn troll coins')
  ,
                   
	async execute(interaction, client) {

const db = require("./../database/connect.js");


const currency = db.table("currency");

const settings = db.table("settings");
    
const times = db.table("times");

const counts = db.table("counts");

const titles = db.table("titles");

const JbegR = Jbeg[Math.floor(Math.random() * Jbeg.length)];
    
    const reward = Math.floor(Math.random() * (5000 -  + 3000)) + 3000;

  let user = interaction.user;

let register = await settings.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`**${emojis.cross} Use /register To Register Your Account In My Database**`)
    }

    
        let timeout = 60000;
        let amount = reward;

        let beg = await times.get(`${user.id}.beg`);

        if (beg !== undefined && timeout - (Date.now() - beg) > 0) {
            let time = ms(timeout - (Date.now() - beg));

            let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`**${emojis.cross} You Just Begged To Someone And Earned Some Money\n\nBeg Again In ${time}**`)
          .setFooter({text: `${embeds.footer}`})
            interaction.editReply({embeds: [embed1]})
        } else {
          
            let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`**${JbegR} ${emojis.troll_coin} ${amount}**`)
          .setFooter({text: `${embeds.footer}`});
            
interaction.editReply({embeds: [embed2]})

          await counts.add(`${user.id}.begs`, 1)
            await currency.add(`${user.id}.balance`, amount)
            await times.set(`${user.id}.beg`, Date.now())

          let title_beggar = await titles.get(`${user.id}.beggar`)
  
if (title_beggar === undefined) title_beggar = "false";

if (title_beggar === 'false') {
  await titles.set(`${user1.id}.beggar`, 'true')

let embedtit = new EmbedBuilder() 
  
  .setColor(embeds.color)
          .setTitle(`**Title Unlocked ⭐**`)
          .setDescription(`You Got **Poor Beggar** title`)
          .setFooter({text: `tips: use /settings-title to equip it.`});

interaction.followUp({embeds: [embedtit], ephemeral: true}) 
}

              }


	},
}