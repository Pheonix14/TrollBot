const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, SlashCommandBuilder } = require("discord.js");
const embeds = require("./../config/embed.json");
const emojis = require("./../config/emojis.json");
const prices = require("./../JSON/prices.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shop')
		.setDescription('🏪 See Items To Buy')
  .setDMPermission(false),
	async execute(interaction, client) {


const db = require("./../database/connect.js");
    
const settings = db.table("settings");
    
let register = await settings.get(`${interaction.user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }
    
const row = new ActionRowBuilder()
  .addComponents(
    new SelectMenuBuilder()
     .setCustomId("shop_select")
    .setPlaceholder("Select Your Option")
    .addOptions([
 {
 label: "Tools",
  emoji: emojis.phone,
 description: "Click Here To See All Tool Items",
 value: "shop_first"
 },
 {
 label: "Collectables",
  emoji: emojis.cool_meow,
 description: "Click Here To See All Collectable Items", 
 value: "shop_second"
 }
    ])
  )
    
const embed1 = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**Welcome To TrollBot Shop**`)
.setDescription(`Here You Can Check Prices Of Items And You Can Buy Something Using /buy. And Item Info Using /item

**Click The Drop-down Menu To See Prices**`)
.setFooter({text: `${embeds.footer}`});

		 interaction.editReply({embeds: [embed1], components: [row] });
	
  
const embed2 = new EmbedBuilder()
    .setColor(embeds.color)
  .setTitle(`Tool Items`)
    .setDescription(`${emojis.phone} Phone: ${emojis.troll_coin} ${prices.phone}

${emojis.laptop} Laptop: ${emojis.troll_coin} ${prices.laptop}

${emojis.shovel} Shovel: ${emojis.troll_coin} ${prices.shovel}

${emojis.fishing_rod} Fishing Rod: ${emojis.troll_coin} ${prices.fishing_rod}

${emojis.bank_upgrader} Bank Upgrade: ${emojis.troll_coin} ${prices.bank_upgrader}`)
  .setFooter({text: `${embeds.footer}`});

const embed3 = new EmbedBuilder()
    .setColor(embeds.color)
  .setTitle(`Collectable Items`)
    .setDescription(`${emojis.toilet_paper} Toilet Paper: ${emojis.troll_coin} ${prices.toilet_paper}
    
${emojis.cool_meow} Cool Meow: ${emojis.troll_coin} ${prices.cool_meow}

${emojis.troll_sword} Troll Sword: ${emojis.troll_coin} ${prices.troll_sword}

${emojis.golden_troll_coin} Golden Troll Coin: ${emojis.troll_coin} ${prices.golden_troll_coin}

${emojis.troll_crown} Troll Crown: ${emojis.troll_coin} ${prices.troll_crown}`)
  .setFooter({text: `${embeds.footer}`});


const collector = interaction.channel.createMessageComponentCollector({ 
ComponentType: "SELECT_MENU",
customId: 'shop_select',
time: '60000',
  max: 2
})

collector.on("collect", async (collected) => { const value = collected.values[0]

if(value === "shop_first") {

collected.reply ({embeds: [embed2], ephemeral: true})
}

if(value === "shop_second") {

collected.reply ({embeds: [embed3], ephemeral: true})
}


   })
  }
}