const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ms = require("ms");
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const Jwork = require('./../JSON/works.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('work')
		.setDescription('👷 work and earn troll coins'),
                   
	async execute(interaction, client) {

const db = require("./../database/connect.js");



const currency = db.table("currency");

const settings =  db.table("settings");

const times = db.table("times");

const counts = db.table("counts");

    const JworkR = Jwork[Math.floor(Math.random() * Jwork.length)];

    const reward = Math.floor(Math.random() * (3000 -  + 2000)) + 2000;

  let user = interaction.user;

let register = await settings.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }
    
        let timeout = 3600000;
        let amount = reward;

        let work = await times.get(`${user.id}.work`);

        if (work !== undefined && timeout - (Date.now() - work) > 0) {
            let time = ms(timeout - (Date.now() - work));

            let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${emojis.cross} You've Already Worked And Collected Reward\n\nWork Again In ${time}`)
          .setFooter({text: `${embeds.footer}`})
            interaction.editReply({embeds: [embed1]})
        } else {
            let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${JworkR} ${emojis.troll_coin} ${amount}`)
          .setFooter({text: `${embeds.footer}`});
            
interaction.editReply({embeds: [embed2]})

          await counts.add(`${user.id}.works`, 1)
            await currency.add(`${user.id}.balance`, amount)
            await times.set(`${user.id}.work`, Date.now())


              }


	},
            }