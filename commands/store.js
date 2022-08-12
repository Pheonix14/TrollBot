const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, SlashCommandBuilder } = require("discord.js");
const embeds = require("./../config/embed.json");
const emojis = require("./../config/emojis.json");
const prices = require("./../JSON/prices.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('store')
		.setDescription('🏪 See Items To Buy'),
	async execute(interaction, client) {
await interaction.deferReply();
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

`)
  .setFooter({text: `${embeds.footer}`});

const embed3 = new EmbedBuilder()
    .setColor(embeds.color)
  .setTitle(`Collectable Items`)
    .setDescription(`soon`)
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