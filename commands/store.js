const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, SlashCommandBuilder } = require("discord.js");
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "././database/database.sqlite" });
const embeds = require("./../config/embed.json");
const emojis = require("./../config/emojis.json");
const prices = require("./../JSON/prices.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('store')
		.setDescription('🏪 See Items To Buy'),
	async execute(interaction, client) {
await interaction.deferReply();

const economy = db.table("economy");
    
let register = await economy.get(`${interaction.user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }
    
const row = new ActionRowBuilder()
  .addComponents(
    new SelectMenuBuilder()
     .setCustomId("select")
    .setPlaceholder("Select Your Option")
    .addOptions([
 {
 label: "Tools",
  emoji: emojis.phone,
 description: "Click Here To See All Tool Items",
 value: "first"
 },
 {
 label: "Collectables",
  emoji: emojis.cool_meow,
 description: "Click Here To See All Collectable Items", 
 value: "second"
 }
    ])
  )
    
const embed1 = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**Welcome To TrollBot Store**`)
.setDescription(`__Here You Can Check Prices Of Items And You Can Buy Something Using /buy__

**Click The Drop-down Menu To See Prices**`)
.setFooter({text: `${embeds.footer}`});

		 interaction.editReply({embeds: [embed1], components: [row] });
	
  
const embed2 = new EmbedBuilder()
    .setColor(embeds.color)
  .setTitle(`Tool Items`)
    .setDescription(`${emojis.phone} Phone — ${emojis.troll_coin} ${prices.phone}


${emojis.laptop} Laptop — ${emojis.troll_coin} ${prices.laptop}


${emojis.shovel} Shovel — ${emojis.troll_coin} ${prices.shovel}


${emojis.fishing_rod} Fishing Rod — ${emojis.troll_coin} ${prices.fishing_rod}


${emojis.bank_upgrader} Bank Upgrade — ${emojis.troll_coin} ${prices.bank_upgrader}`)
  .setFooter({text: `${embeds.footer}`});

const embed3 = new EmbedBuilder()
    .setColor(embeds.color)
  .setTitle(`Collectable Items`)
    .setDescription(`${emojis.toilet_paper} Toilet Paper — ${emojis.troll_coin} ${prices.toilet_paper}
    
    
${emojis.cool_meow} Cool Meow — ${emojis.troll_coin} ${prices.cool_meow}


${emojis.golden_toilet_paper} Golden Toilet Paper — ${emojis.troll_coin} ${prices.golden_toilet_paper}


${emojis.golden_troll_coin} Golden Troll Coin — ${emojis.troll_coin} ${prices.golden_troll_coin}


${emojis.troll_crown} Troll Crown — ${emojis.troll_coin} ${prices.troll_crown}`)
  .setFooter({text: `${embeds.footer}`});


const collector = interaction.channel.createMessageComponentCollector({ 
ComponentType: "SELECT_MENU",
customId: 'select',
time: '60000'
})

collector.on("collect", async (collected) => { const value = collected.values[0]

if(value === "first") {

collected.reply ({embeds: [embed2], ephemeral: true})
}

if(value === "second") {

collected.reply ({embeds: [embed3], ephemeral: true})
}


   })
  }
}