const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const embeds = require("./../config/embed.json");
const emojis = require("./../config/emojis.json");
const links = require("./../config/links.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Full Command List 📜'),
	async execute(interaction, client) {

const row = new MessageActionRow()
  .addComponents(
    new MessageSelectMenu()
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
 label: "Images",
  emoji: emojis.images,
 description: "Click here to see Images commands list", 
 value: "second"
 },
{
 label: "Memes", 
  emoji: emojis.meme,
 description: "Click here to see Memes Commands", 
 value: "third"
}
    ])
  )
    
const embed1 = new MessageEmbed()
  .setColor(embeds.color)
  .setTitle(`**Welcome To TrollBot**`)
.setDescription(`Check The Menu And Select Your Option To See Commands List.

${emojis.arrow} [Website](${links.website})

${emojis.arrow} [Support](${links.support_server})

${emojis.arrow} [Invite Me](${links.invite})`)
 .setImage(`${links.banner}`)
.setFooter({text: `${embeds.footer}`});

		 interaction.reply({embeds: [embed1], components: [row] });
	
  
const embed2 = new MessageEmbed()
    .setColor(embeds.color)
  .setTitle(`${emojis.info} Info Commands`)
    .setDescription(`/ping, /help, /support, /invite, /botinfo, /updates, /vote`)
  .setFooter({text: `${embeds.footer}`});

const embed3 = new MessageEmbed()
    .setColor(embeds.color)
  .setTitle(`${emojis.images} Images Commands`)
    .setDescription(`/affect, /aborted, /brazzers, /cancer, /corporate, /dab, /delete, /door, /egg, /failure, /fakenews, /hitler, /jail, /satan, /trash, /whodidthis, /ugly`)
  .setFooter({text: `${embeds.footer}`});

    const embed4 = new MessageEmbed()
    .setColor(embeds.color)
  .setTitle(`${emojis.meme} Memes Commands`)
    .setDescription(`/meme, /abandon, /armor, /bed, /emergencymeeting, /facts, /godwhy, /humansgood, /note, /obama, /search, /savehumanity, /shit, /stonks, /comment, /tweet`)
  .setFooter({text: `${embeds.footer}`});

  

const collector = interaction.channel.createMessageComponentCollector({ 
componentType: "SELECT_MENU",
customId: 'select'
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

   })
  }
};