const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const embeds = require("./../config/embed.json");
const emojis = require("./../config/emojis.json");
const links = require("./../config/links.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('Vote The Bot On Top.gg And DBL 🗳️'),
	async execute(interaction, client) {
    const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Top.gg')
          .setURL(links.vote_topgg)
          .setEmoji(emojis.vote_topgg)
					.setStyle('LINK'),
			);

    const row2 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('DBL')
          .setURL(links.vote_dbl)
          .setEmoji(emojis.vote_dbl)
					.setStyle('LINK'),
			);

const embed = new MessageEmbed()
  .setColor(embeds.color)
  .setTitle(`${emojis.vote} TrollBot Vote`)
.setDescription(`**If You Using Our Bot And Want To Support Our Development Then Please Vote To Our Bot**`)
  
  
.setFooter({text: `${embeds.footer}`});

		return interaction.reply({embeds: [embed], components: [row, row2] });
	},
};