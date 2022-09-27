const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ms = require('ms')
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('🙋 view profile')
  .addUserOption(option => option.setName('user').setDescription('Give Me A User')),
                   
	async execute(interaction, client) {

const db = require("./../database/connect.js");
    

const currency = db.table("currency");

  const times = db.table("times");

const settings = db.table("settings");

const counts = db.table("counts");
    
    const user = interaction.options.getUser('user');

    const user1 = interaction.user;
    
let register = await settings.get(`${user1.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }

if (!user) {

let bal1 = await currency.get(`${user1.id}.balance`)

if (bal1 === undefined) bal1 = 0;

let bio1 = await settings.get(`${user1.id}.bio`)

if (bio1 === undefined) bio1 = "";
  
let bank1 = await currency.get(`${user1.id}.bank`)

if (bank1 === undefined) bank1 = 0;
  
let invw1 = await currency.get(`${user1.id}.inventory_worth`)

if (invw1 === undefined) invw1 = 0;

let net1 = bal1 + bank1 + invw1;

let rank1 = await settings.get(`${user1.id}.rank`)
 
if (rank1 === undefined) rank1 = 'None';

let joined1 = await times.get(`${user1.id}.joined`)

  
let joinedr1 = ms(Date.now() - joined1, { long: true });

  let rob_pass1 = await counts.get(`${user1.id}.rob_pass`)

if (rob_pass1 === undefined) rob_pass1 = 0;
  
let rob_fail1 = await counts.get(`${user1.id}.rob_fails`)

if (rob_fail1 === undefined) rob_fail1 = 0;
  
let rob_worth1 = await currency.get(`${user1.id}.rob_worth`)

if (rob_worth1 === undefined) rob_worth1 = 0;
  
let rob_loss1 = await currency.get(`${user1.id}.rob_loss`)

if (rob_loss1 === undefined) rob_loss1 = 0;
  
let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
.setThumbnail(user1.displayAvatarURL())
  .setTitle(`${user1.username}'s Profile`)
.setDescription(`${bio1}

**Info -**
Started: ${joinedr1}
Rank: ${rank1}

**Currency Stats -**
Balance: ${emojis.troll_coin} ${bal1}
Bank: ${emojis.troll_coin} ${bank1}
Inventory Worth: ${emojis.troll_coin} ${invw1}
Net Worth: ${emojis.troll_coin} ${net1}

**Rob Stats -**
Rob Pass: ${rob_pass1}
Rob Fails: ${rob_fail1}
Rob Worth: ${emojis.troll_coin} ${rob_worth1}
Rob Loss: ${emojis.troll_coin} ${rob_loss1}
`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed1]})
  
}

if (user) {

let bal2 = await currency.get(`${user.id}.balance`)

if (bal2 === undefined) bal2 = 0;
  
let bio2 = await settings.get(`${user.id}.bio`)

if (bio2 === undefined) bio2 = "";

let bank2 = await currency.get(`${user.id}.bank`)

if (bank2 === undefined) bank2 = 0;
  
let invw2 = await currency.get(`${user.id}.inventory_worth`)

if (invw2 === undefined) invw2 = 0;

let net2 = bal2 + bank2 + invw2;

let rank2 = await settings.get(`${user.id}.rank`)
 
if (rank2 === undefined) rank2 = 'None';

let joined2 = await times.get(`${user.id}.joined`)

if (joined2 === undefined) joined2 = Date.now();
  
let joinedr2 = ms(Date.now() - joined2, { long: true });

if (joinedr2 !== "0 ms") joinedr2 = `${joinedr2} Ago`;

if (joinedr2 === "0 ms") joinedr2 = "Not Started Yet";

let rob_pass2 = await counts.get(`${user.id}.rob_pass`)

if (rob_pass2 === undefined) rob_pass2 = 0;
  
let rob_fail2 = await counts.get(`${user.id}.rob_fails`)

if (rob_fail2 === undefined) rob_fail2 = 0;
  
let rob_worth2 = await currency.get(`${user.id}.rob_worth`)

if (rob_worth2 === undefined) rob_worth2 = 0;
  
let rob_loss2 = await currency.get(`${user.id}.rob_loss`)

if (rob_loss2 === undefined) rob_loss2 = 0;
  
let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
.setThumbnail(user.displayAvatarURL())
  .setTitle(`${user.username}'s Profile`)
.setDescription(`${bio2}

**Info -**
Started: ${joinedr2}
Rank: ${rank2}

**Currency Stats -**
Balance: ${emojis.troll_coin} ${bal2}
Bank: ${emojis.troll_coin} ${bank2}
Inventory Worth: ${emojis.troll_coin} ${invw2}
Net Worth: ${emojis.troll_coin} ${net2}

**Rob Stats -**
Rob Pass: ${rob_pass2}
Rob Fails: ${rob_fail2}
Rob Worth: ${emojis.troll_coin} ${rob_worth2}
Rob Loss: ${emojis.troll_coin} ${rob_loss2}
`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed2]})
  
}
    
    
	},
}