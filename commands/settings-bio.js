const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('settings-bio')
        .setDescription('⚙️ change profile bio'),
                   
    async execute(interaction, client) {
    
    const modal = new ModalBuilder()
            .setCustomId('myModal')
            .setTitle('Profile Bio');

        
        const bio = new TextInputBuilder()
.setCustomId('bio')
.setLabel("Text")
.setStyle(TextInputStyle.Short)
.setRequired(true);

        
        const firstActionRow = new ActionRowBuilder().addComponents(bio);

        modal.addComponents(firstActionRow);

        
        await interaction.showModal(modal);
      
    },
} 
