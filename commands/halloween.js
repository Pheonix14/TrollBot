const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const ms = require("ms");
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('halloween')
		.setDescription('🎃 claim your halloween gift'),
                   
	async execute(interaction, client) {

const db = require("./../database/connect.js");

const items = db.table('items');
    
const halloween = db.table('halloween');

const settings = db.table('settings');

const currency = db.table(`currency`)
    
const titles = db.table("titles");
    
const user = interaction.user;

let register = await settings.get(`${interaction.user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }

let claimed = await halloween.get(`${user.id}.claimed`);
    
if (claimed === undefined) claimed = 'none';

if (claimed === 'claimed') {
  
const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('halloween_claimed')
					.setLabel('Claimed!')
        .setDisabled(true)
				.setStyle(ButtonStyle.Success),
			);

const embed = new EmbedBuilder()
  .setColor(embeds.color)
    .setTitle(`Happy Halloween`)
.setDescription(`Halloween is a holiday celebrated each year on October 31, and Halloween 2022 will occur on Monday, October 31. The tradition originated with the ancient Celtic festival of Samhain, when people would light bonfires and wear costumes to ward off ghosts.
`)
  .setImage(`https://media.discordapp.net/attachments/970639356148715552/1035495645169070140/images_3.jpg`)
  .setFooter({text: `${embeds.footer}`});

	return interaction.editReply({embeds: [embed], components: [row] });

} else {
  
    const row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('halloween_claim')
					.setLabel('Claim')
					.setStyle(ButtonStyle.Success),
			);

const embed2 = new EmbedBuilder()
  .setColor(embeds.color)
    .setTitle(`Happy Halloween`)
.setDescription(`Halloween is a holiday celebrated each year on October 31, and Halloween 2022 will occur on Monday, October 31. The tradition originated with the ancient Celtic festival of Samhain, when people would light bonfires and wear costumes to ward off ghosts.

**Notice: Claim Before 4 November**

**Click Claim Button To Claim Your Halloween**`)
  .setImage(`https://media.discordapp.net/attachments/970639356148715552/1035495645169070140/images_3.jpg`)
  .setFooter({text: `${embeds.footer}`});

 interaction.editReply({embeds: [embed2], components: [row2] });

const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });

collector.on('collect', async i => {
	if (i.customId === 'halloween_claim') {
    
		await i.deferUpdate();

  
  if (user.id !== i.user.id) {
    return;
  } else {
    
let claimed_button = await halloween.get(`${i.user.id}.claimed`)

if (claimed_button === undefined) claimed_button = 'none';
    
if (claimed_button === 'claimed') return i.followUp({content: "You've Already Claimed The Gift", ephemeral: true })
    
    await items.add(`${i.user.id}.Jacko_lantern`, 1)

await halloween.set(`${i.user.id}.claimed`, 'claimed')

await titles.set(`${i.user.id}.halloween_2022`, 'true')
  
i.followUp(`You Got x1 Jack-o'-lantern ${emojis.jacko}`)
  }

	}
});

collector.on('end', collected => console.log(`Collected ${collected.size} items`));
  
}
	},
}