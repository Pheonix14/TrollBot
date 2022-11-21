const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const embeds = require("./../config/embed.json");
const emojis = require("./../config/emojis.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('updates')
		.setDescription('Know About Letest Updates 📜'),
	async execute(interaction, client) {

  const embed = new EmbedBuilder()
  .setColor(embeds.color)
    .setTitle(`**TrollBot Updates**`)
.setDescription(`**Version - 2.2.0

- Added New Titles System And /settings-titles. It's Looks Cool On Your Profile.

- Changed Slots Win Prizes. Now Common 4x And Rare 6x.

- Added Sell Values For All Collectables

- Changed Font Of The Bot.

- Added Vote Rewarding System.

- Added Button Grinding System For /fish and /dig.

- Added Laptop Usage.

- Changes In Buy And Sell Values

- Heavily Changes In Pricing and Earning.

- Earning Is More Eaiser Now.

Thank You!
- TrollBot Development
**`)
  
.setFooter({text: `${embeds.footer}`})
    .setTimestamp();

	return interaction.editReply({embeds: [embed] });

  },
};