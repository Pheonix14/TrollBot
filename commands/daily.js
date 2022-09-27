const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ms = require("ms");
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('🎁 collect your daily reward'),
                   
	async execute(interaction, client) {

const db = require("./../database/connect.js");
    

const currency = db.table("currency");

const settings = db.table("settings");
    
const times = db.table("times");

const counts = db.table("counts");
    
  let user = interaction.user;

let register = await settings.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }
    

        let timeout = 86400000;
        let amount = 15000;

        let daily = await times.get(`${user.id}.daily`);

        if (daily !== undefined && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${emojis.cross} You've Already Collected Your Daily Reward\n\nCollect It Again In ${time}`)
          .setFooter({text: `${embeds.footer}`})
            interaction.editReply({embeds: [embed1]})
        } else {
            let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`You've Collected Your Daily Reward Of ${emojis.troll_coin} ${amount} Troll Coins`)
          .setFooter({text: `${embeds.footer}`});
            
interaction.editReply({embeds: [embed2]})

            await currency.add(`${user.id}.balance`, amount)
            await times.set(`${user.id}.daily`, Date.now())

await counts.add(`${user.id}.dailys`, 1)

              }


	},
}