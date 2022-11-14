const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const embeds = require("./../config/embed.json");
const emojis = require("./../config/emojis.json");
const links = require("./../config/links.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('Vote The Bot On Top.gg And DBL 🗳️'),
	async execute(interaction, client) {
    
    const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Top.gg')
          .setURL(links.vote_topgg)
          .setEmoji(emojis.vote_topgg)
					.setStyle('Link'),
			);

    const row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('DBL')
          .setURL(links.vote_dbl)
          .setEmoji(emojis.vote_dbl)
					.setStyle('Link'),
			);

const embed = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`${emojis.vote} TrollBot Vote`)
.setDescription(`**If You Using TrollBot And Want To Support Our Development Then Please Vote To TrollBot

Vote Rewards:

${emojis.troll_coin} 50,000 Troll Coins

x2 ${emojis.bank_upgrader} Bank Upgraders

Note: You Only Get Reward For Voting On Top.gg**`)
  
.setFooter({text: `${embeds.footer}`});

		return interaction.editReply({embeds: [embed], components: [row, row2] });
	},
};