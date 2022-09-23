const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, SlashCommandBuilder } = require("discord.js");
const embeds = require("./../config/embed.json");
const emojis = require("./../config/emojis.json");
const links = require("./../config/links.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Full Command List 📜'),
	async execute(interaction, client) {
await interaction.deferReply();
    
const row = new ActionRowBuilder()
  .addComponents(
    new SelectMenuBuilder()
     .setCustomId("select")
    .setPlaceholder("Select Your Option")
    .addOptions([
 {
 label: "info",
  emoji: emojis.info,
 description: "Click here to see Info commands list",
 value: "first"
 },
{
 label: "Memes", 
  emoji: emojis.meme,
 description: "Click here to see Memes Commands", 
 value: "second"
},
{
 label: "Currency Game (BETA)", 
  emoji: emojis.troll_coin,
 description: "Click here to see Currency Game Commands", 
 value: "third"
},
{
 label: "Game Settings (BETA)", 
  emoji: emojis.settings,
 description: "Click here to see Game Settings Commands", 
 value: "fourth"
      }
    ])
  )
    
const embed1 = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**Welcome To TrollBot**`)
.setDescription(`__**My Features**__

> **${emojis.meme} 7+ Funny Meme Commands. ${emojis.troll_coin} 15+ Game Commands.**

__**My Stats**__

> **${emojis.server} ${interaction.client.guilds.cache.size} Servers ${emojis.users} ${interaction.client.users.cache.size} Users ${emojis.channel} ${interaction.client.channels.cache.size} Channels**

__**Note**__

> **Check The Menu And Select Your Option To See Commands List.**

__**Links**__

**${emojis.arrow} [Website](${links.website})

${emojis.arrow} [Support](${links.support_server})

${emojis.arrow} [Invite Me](${links.invite})**`)
 .setImage(`${links.banner}`)
.setFooter({text: `${embeds.footer}`});

		 interaction.editReply({embeds: [embed1], components: [row] });
	
  
const embed2 = new EmbedBuilder()
    .setColor(embeds.color)
  .setTitle(`${emojis.info} Info Commands`)
    .setDescription("`/ping`, `/help`, `/support`, `/invite`, `/updates`, `/vote`")
  .setFooter({text: `${embeds.footer}`});


    const embed3 = new EmbedBuilder()
    .setColor(embeds.color)
  .setTitle(`${emojis.meme} Memes Commands`)
    .setDescription("`/meme`, `/abandon`, `/facts`, `/note`, `/stonks`, `/comment`, `/tweet`")
  .setFooter({text: `${embeds.footer}`});

  const embed4 = new EmbedBuilder()
    .setColor(embeds.color)
  .setTitle(`${emojis.troll_coin} Currency Game Commands`)
    .setDescription("`/balance`, `/deposit`, `/withdraw`, `/pay`, `/daily`, `/work`, `/beg`, `/coinflip`, `/shop`, `/buy`, `/use`, `/dig`, `/fish`, `/sell`, `/profile`, `/rob`, `/item`")
  .setFooter({text: `${embeds.footer}`});

const embed5 = new EmbedBuilder()
    .setColor(embeds.color)
  .setTitle(`${emojis.settings} Game Settings Commands`)
    .setDescription("`/register`, `/settings-bio`, `/settings-safemode`")
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
if(value === "third") {

collected.reply ({embeds: [embed4], ephemeral: true})
}

if(value === "fourth") {

collected.reply ({embeds: [embed5], ephemeral: true})
  }
             
   })
  }
};