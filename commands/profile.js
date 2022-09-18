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
    
    await interaction.deferReply();

const currency = db.table("currency");

  const times = db.table("times");

const settings = db.table("settings");
    
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
  
let bank1 = await currency.get(`${user1.id}.bank`)

if (bank1 === undefined) bank1 = 0;
  
let invw1 = await currency.get(`${user1.id}.inventory_worth`)

if (invw1 === undefined) invw1 = 0;

let net1 = bal1 + bank1 + invw1;

let rank1 = await settings.get(`${user1.id}.rank`)
 
if (rank1 === undefined) rank1 = 'None';

let joined1 = await times.get(`${user1.id}.joined`)

  
let joinedr1 = ms(Date.now() - joined1, { long: true });

  
let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
.setThumbnail(user1.displayAvatarURL())
  .setTitle(`${user1.username}'s Profile`)
.setDescription(`**Joined** - ${joinedr1} Ago

**Rank** - ${rank1}

**Balance** - ${bal1}

**Bank** - ${bank1}

**Inventory Worth** - ${invw1}

**Net Worth** - ${net1}`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed1]})
  
}

if (user) {

let bal2 = await currency.get(`${user.id}.balance`)

if (bal2 === undefined) bal2 = 0;
  
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

  
let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
.setThumbnail(user.displayAvatarURL())
  .setTitle(`${user.username}'s Profile`)
.setDescription(`**Joined** - ${joinedr2}

**Rank** - ${rank2}

**Balance** - ${bal2}

**Bank** - ${bank2}

**Inventory Worth** - ${invw2}

**Net Worth** - ${net2}`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed2]})
  
}
    
    
	},
}