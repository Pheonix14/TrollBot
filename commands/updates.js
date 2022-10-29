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
.setDescription(`**Version - 2.1.0

- Added Command /settings-notify

- Added More Security On /settings-rob command

- Added Most Of Slash Commands In Dms

- Bug Fixes

- Added Item ${emojis.jacko} Jack-o'-lantern

Thank You!
- TrollBot Development
**`)
  
.setFooter({text: `${embeds.footer}`})
    .setTimestamp();

	return interaction.editReply({embeds: [embed] });

  },
};