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
    
await interaction.deferReply();

const user = interaction.targetUser;
    
    const currency = db.table("currency");

  const times = db.table("times");

const settings = db.table("settings");

let register = await settings.get(`${interaction.user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }

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

    
	},
}