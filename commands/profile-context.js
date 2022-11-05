const { EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const ms = require('ms')

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('Profile')
.setType(ApplicationCommandType.User),
	async execute(interaction, client) {

    const db = require("./../database/connect.js");
    

const user = interaction.targetUser;
    
    const currency = db.table("currency");

  const times = db.table("times");

const settings = db.table("settings");

const counts = db.table("counts");

let register = await settings.get(`${interaction.user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }

let bal2 = await currency.get(`${user.id}.balance`)

if (bal2 === undefined) bal2 = 0;
  
let bio2 = await settings.get(`${user.id}.bio`)

if (bio2 === undefined) bio2 = "";
    
let bank2 = await currency.get(`${user.id}.bank`)

if (bank2 === undefined) bank2 = 0;
  
let invw2 = await currency.get(`${user.id}.inventory_worth`)

if (invw2 === undefined) invw2 = 0;

let net2 = bal2 + bank2 + invw2;

let title2 = await settings.get(`${user.id}.title`)
 
if (title2 === undefined) title2 = 'None';

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
Title: ${title2}

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

    
	},
}