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

const items = db.table("items");
    
    const JworkR = Jwork[Math.floor(Math.random() * Jwork.length)];

    const reward = Math.floor(Math.random() * (10000 -  + 30000)) + 30000;

  let user = interaction.user;

let laptop = await items.get(`${user.id}.laptol`)

if (laptop === undefined) laptop = 0;

if (laptop === 0) return interaction.editReply(`you need laptop to work`);

let register = await settings.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`**${emojis.cross} Use /register To Register Your Account In My Database**`)
    }
    
        let timeout = 3600000;
        let amount = reward;

        let work = await times.get(`${user.id}.work`);

        if (work !== undefined && timeout - (Date.now() - work) > 0) {
            let time = ms(timeout - (Date.now() - work));

            let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`**You've Already Worked And Collected Reward\n\nWork Again In ${time}**`)
          .setFooter({text: `${embeds.footer}`})
            interaction.editReply({embeds: [embed1]})
        } else {
            let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`**${JworkR} ${emojis.troll_coin} ${amount}**`)
          .setFooter({text: `${embeds.footer}`});
            
interaction.editReply({embeds: [embed2]})

          await counts.add(`${user.id}.works`, 1)
            await currency.add(`${user.id}.balance`, amount)
            await times.set(`${user.id}.work`, Date.now())


              }


	},
            }