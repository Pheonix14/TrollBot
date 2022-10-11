const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ms = require("ms");
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const Jcrime = require('./../JSON/crimes.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('crime')
		.setDescription('🔫 commit a (fake) crime and earn some troll coins'),
                   
	async execute(interaction, client) {

const db = require("./../database/connect.js");


const currency = db.table("currency");

const settings = db.table("settings");
    
const times = db.table("times");

const counts = db.table("counts");

const JcrimeR = Jcrime[Math.floor(Math.random() * Jcrime.length)];
    
    const reward = Math.floor(Math.random() * (500 -  + 300)) + 300;

  let user = interaction.user;

let register = await settings.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }

    
        let timeout = 60000;
        let amount = reward;

        let crime = await times.get(`${user.id}.crime`);

        if (crime !== undefined && timeout - (Date.now() - crime) > 0) {
            let time = ms(timeout - (Date.now() - crime));

            let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${emojis.cross} You Just Commit A Crime And Earned Some Money\n\nCrime Again In ${time}`)
          .setFooter({text: `${embeds.footer}`})
            interaction.editReply({embeds: [embed1]})
        } else {
            let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${JcrimeR} ${emojis.troll_coin} ${amount}`)
          .setFooter({text: `${embeds.footer}`});
            
interaction.editReply({embeds: [embed2]})

          await counts.add(`${user.id}.crimes`, 1)
            await currency.add(`${user.id}.balance`, amount)
            await times.set(`${user.id}.crime`, Date.now())


              }


	},
  }