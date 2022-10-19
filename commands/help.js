const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, SlashCommandBuilder } = require("discord.js");
const embeds = require("./../config/embed.json");
const emojis = require("./../config/emojis.json");
const links = require("./../config/links.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Full Command List 📜'),
	async execute(interaction, client) {

    
const row = new ActionRowBuilder()
  .addComponents(
    new SelectMenuBuilder()
     .setCustomId("help_select")
    .setPlaceholder("Select Your Option")
    .addOptions([
 {
 label: "info",
  emoji: emojis.info,
 description: "Click here to see Info commands list",
 value: "help_first"
 },
{
 label: "Memes", 
  emoji: emojis.meme,
 description: "Click here to see Memes Commands", 
 value: "help_second"
},
{
 label: "Currency", 
  emoji: emojis.troll_coin,
 description: "Click here to see Currency Commands", 
 value: "help_third"
},
{
 label: "Earning", 
  emoji: emojis.fishing_rod,
 description: "Click here to see Earning Commands", 
 value: "help_fifth"
},
{
 label: "Game Settings", 
  emoji: emojis.settings,
 description: "Click here to see Game Settings Commands", 
 value: "help_fourth"
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
  .setTitle(`${emojis.troll_coin} Currency Commands`)
    .setDescription("`/balance`, `/deposit`, `/withdraw`, `/pay`, `/shop`, `/buy`, `/use`, `/profile`, `/item`")
  .setFooter({text: `${embeds.footer}`});

const embed6 = new EmbedBuilder()
    .setColor(embeds.color)
  .setTitle(`${emojis.fishing_rod} Earning Commands`)
    .setDescription("`/daily`, `/work`, `/beg`, `/coinflip`, `/dig`, `/fish`, `/sell`, `/rob`, `/slot`, `/crime`")
  .setFooter({text: `${embeds.footer}`});
  
const embed5 = new EmbedBuilder()
    .setColor(embeds.color)
  .setTitle(`${emojis.settings} Game Settings Commands`)
    .setDescription("`/register`, `/settings-bio`, `/settings-safemode,` `/settings-rob`")
  .setFooter({text: `${embeds.footer}`});

    
const collector = interaction.channel.createMessageComponentCollector({ 
ComponentType: "SELECT_MENU",
customId: 'help_select',
time: '60000'
})

collector.on("collect", async (collected) => { const value = collected.values[0]

if(value === "help_first") {

collected.reply ({embeds: [embed2], ephemeral: true})
}

if(value === "help_second") {

collected.reply ({embeds: [embed3], ephemeral: true})
}
if(value === "help_third") {

collected.reply ({embeds: [embed4], ephemeral: true})
}

if(value === "help_fourth") {

collected.reply ({embeds: [embed5], ephemeral: true})
  }

   if(value === "help_fifth") {

collected.reply ({embeds: [embed6], ephemeral: true})
   }
   })
  }
};