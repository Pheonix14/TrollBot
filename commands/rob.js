const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rob')
		.setDescription('🥷 rob someone')
  .addUserOption(option => option.setName('user').setDescription('Give Me A User To Rob').setRequired(true)),
                   
	async execute(interaction, client) {

const db = require("./../database/connect.js");

    

    const currency = db.table("currency");
    
const settings = db.table("settings");

const guild_settings = db.table("guild_settings");

const times = db.table("times");

const counts = db.table("counts")

const user = interaction.options.getUser('user');

const user1 = interaction.user;
    
let register = await settings.get(`${user1.id}.register`)
    
if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }

let timeout = 300000;

        let rob = await times.get(`${user1.id}.rob`);

        if (rob !== undefined && timeout - (Date.now() - rob) > 0) {
            let time = ms(timeout - (Date.now() - rob));

            let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${emojis.cross} You Just Robbed A Parson\n\nRob Again In ${time}`)
          .setFooter({text: `${embeds.footer}`})
          return interaction.editReply({embeds: [embed1]})
        }

if (user1.id === user.id) {
  return interaction.editReply("You Can't Rob Yourself.. Dumb")
}
    

let safe_mode1 = await settings.get(`${user1.id}.safemode`)

    if (safe_mode1 === undefined) safe_mode1 = 'false';

if (safe_mode1 === "true") {
  return interaction.editReply("You Can't Rob You Are In Safe Mode")
}
    
let safe_mode = await settings.get(`${user.id}.safemode`)

if (safe_mode === undefined) safe_mode = 'false';

if (safe_mode1 === "true") {
  return interaction.editReply("You Can't Rob That Parson In Safe Mode")
}

let rob_guild = await guild_settings.get(`${interaction.guild.id}.rob_setting`)

if (rob_guild === undefined) rob_guild = 'enable';

if (rob_guild === "disable") {
  return interaction.editReply("Rob Is Not Allowed In This Server")
}
    
let balance1 = await currency.get(`${user1.id}.balance`)

if (balance1 === undefined) balance1 = 0;
    
let balance = await currency.get(`${user.id}.balance`)

if (balance === undefined) balance = 0;
    
if (balance1 < 5000) {
  return interaction.editReply(`You Need Atleast ${emojis.troll_coin} 5000 In Your Pocket To Rob Someone`)
}
    
if (balance < 5000) {
  return interaction.editReply(`That Parson Didn't Have Atleast ${emojis.troll_coin} 5000. it's not worth it men`)
}

    
const rob_success_list = ["Successful", "75% chance to pass", "85% chance to pass", "Unsuccessful"];
    
    let rob_result = Math.floor(Math.random() * rob_success_list.length);

if (rob_success_list[rob_result] === "Unsuccessful") {


  const rob_fail = Math.floor(Math.random() * (balance1 -  + 5000)) + 5000;
  
await counts.add(`${user1.id}.rob_fails`, 1)
            await currency.sub(`${user1.id}.balance`, rob_fail)
  await currency.add(`${user1.id}.rob_loss`, rob_fail)
  await currency.add(`${user.id}.balance`, rob_fail)
await times.set(`${user1.id}.rob`, Date.now())

  
let embed2 = new EmbedBuilder() 
  
  .setColor(embeds.color)
          .setDescription(`You Tried To Rob ${user.tag} But You Failed And Lost ${emojis.troll_coin} ${rob_fail}`)
          .setFooter({text: `${embeds.footer}`});
            
interaction.editReply({embeds: [embed2]})

let check_noti = await settings.get(`${user.id}.notification`)

  if (check_noti === undefined) check_noti = "enable";

if (check_noti === "disable") return;
  
let embed5 = new EmbedBuilder() 
  
  .setColor(embeds.color)
          .setDescription(`${user1.tag} Tried To Rob You In ${interaction.guild.name} But He Failed And You Got ${emojis.troll_coin} ${rob_fail}`)
          .setFooter({text: `${embeds.footer}`});
            
user.send({embeds: [embed5]})

  
}
 if (rob_success_list[rob_result] !== "Unsuccessful") {

const rob_pass = Math.floor(Math.random() * (balance -  + 5000)) + 5000;

   
   await counts.add(`${user1.id}.rob_pass`, 1)
            await currency.add(`${user1.id}.balance`, rob_pass)
  await currency.sub(`${user.id}.balance`, rob_pass)
await times.set(`${user1.id}.rob`, Date.now())
   await currency.add(`${user1.id}.rob_worth`, rob_pass)
await currency.add(`${user.id}.rob_loss`, rob_pass)

   
let embed3 = new EmbedBuilder() 
  
  .setColor(embeds.color)
          .setDescription(`You Robbed ${user.tag} And Got ${emojis.troll_coin} ${rob_pass}`)
          .setFooter({text: `${embeds.footer}`});
            
interaction.editReply({embeds: [embed3]})
          
let check_noti = await settings.get(`${user.id}.notification`)

  if (check_noti === undefined) check_noti = "enable";

if (check_noti === "disable") return;
   
let embed4 = new EmbedBuilder() 
  
  .setColor(embeds.color)
          .setDescription(`You Got Robbed By ${user1.tag} In ${interaction.guild.name} And Lost ${emojis.troll_coin} ${rob_pass}`)
          .setFooter({text: `${embeds.footer}`});
            
user.send({embeds: [embed4]})
  
}

    
	},
}