const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const ms = require("ms");
const embeds = require("./../config/embed.json");
const emojis = require("./../config/emojis.json");


module.exports = {
  data: new SlashCommandBuilder()
    .setName('settings')
    .setDescription(`Configure user settings`)
    .addSubcommand(subcommand =>
      subcommand
        .setName('notify')
        .setDescription('🔕 (enable/disable) dm notifications from the bot')
        .addStringOption(option => option.setName('setting').setDescription('choose a option').setRequired(true)
          .addChoices(
            { name: 'enable', value: 'enable' },
            { name: 'disable', value: 'disable' },
          )))
    .addSubcommand(subcommand =>
      subcommand
        .setName('safemode')
        .setDescription('🔒 enable/disable safemode')
        .addStringOption(option => option.setName('setting').setDescription('choose a option').setRequired(true)
          .addChoices(
            { name: 'enable', value: 'enable' },
            { name: 'disable', value: 'disable' },
          )))
    .addSubcommand(subcommand =>
      subcommand
        .setName('titles')
        .setDescription('💎 set a cool title on your profile')
        .addStringOption(option => option.setName('title').setDescription('choose a option').setRequired(true)
          .addChoices(
            { name: 'Halloween Player', value: 'hallo22' },
            { name: 'Robber', value: 'robber' },
            { name: 'Poor Beggar', value: 'beggar' },
            { name: 'Top Criminal', value: 'criminal' },
            { name: 'Pro Gambler', value: 'gambler' },
            { name: 'The King', value: 'king' },
            { name: 'A Warrior', value: 'warrior' },
            { name: 'Gold Investor', value: 'gold_invest' },
            { name: 'Beta Tester', value: 'beta_tester' },
          )))
    .addSubcommand(subcommand =>
      subcommand
        .setName('bio')
        .setDescription('⚙️ change profile bio')
       .addStringOption(option =>
		option.setName('bio')
			.setDescription('Set A Bio For Your Profile').setRequired(true))
    ),
  async execute(interaction, client) {

    if (interaction.options.getSubcommand() === 'notify') {
      const db = require("./../database/connect.js");

      const user = interaction.user;

      const settings = db.table('settings')

      const items = db.table("items");

      let register = await settings.get(`${user.id}.register`)

      if (register === undefined) register = 'false';

      if (register === 'false') {
        return interaction.editReply(`**${emojis.cross} Use /register To Register Your Account In My Database**`)
      }

      const noti_settings = interaction.options.getString('setting');

      let phone = await items.get(`${user.id}.phone`)

      if (phone === undefined) phone = 0;


      if (phone === 0) {
        return interaction.editReply("**You Need A Phone To Use This Command. Tip: use /shop and /buy to buy a phone**")
      }

      if (noti_settings === "enable") {

        let check_noti = await settings.get(`${user.id}.notification`)

        if (check_noti === undefined) check_noti = "enable";

        if (check_noti === "enable") return interaction.editReply("**Dm notification is already enabled 🔔**")

        await settings.set(`${user.id}.notification`, noti_settings)


        const embed = new EmbedBuilder()
          .setColor(embeds.color)
          .setDescription(`**Dm Notification Enabled Sucessfully 🔔**`)
          .setFooter({ text: `${embeds.footer}` });

        interaction.editReply({ embeds: [embed] })

      }

      if (noti_settings === "disable") {

        let check_noti = await settings.get(`${user.id}.notification`)

        if (check_noti === undefined) check_noti = "enable";

        if (check_noti === "disable") return interaction.editReply("**Dm notification is already disabled 🔕**")

        await settings.set(`${user.id}.notification`, noti_settings)


        const embed = new EmbedBuilder()
          .setColor(embeds.color)
          .setDescription(`**Dm Notification Disabled Sucessfully 🔕**`)
          .setFooter({ text: `${embeds.footer}` });

        interaction.editReply({ embeds: [embed] })

      }
    }

    if (interaction.options.getSubcommand() === 'safemode') {

      const db = require("./../database/connect.js");

      const user = interaction.user;

      const settings = db.table("settings");

      const times = db.table("times");

      const items = db.table("items");

      let register = await settings.get(`${user.id}.register`)

      if (register === undefined) register = 'false';

      if (register === 'false') {
        return interaction.editReply(`**${emojis.cross} Use /register To Register Your Account In My Database**`)
      }

      const sm_settings = interaction.options.getString('setting');

      let phone = await items.get(`${user.id}.phone`)

      if (phone === undefined) phone = 0;


      if (phone === 0) {
        return interaction.editReply("**You Need A Phone To Use This Command. Tip: use /shop and /buy to buy a phone**")
      }

      let timeout = 86400000;

      let sm_timeout = await times.get(`${user.id}.sm_timeout`);

      if (sm_timeout !== undefined && timeout - (Date.now() - sm_timeout) > 0) {
        let time = ms(timeout - (Date.now() - sm_timeout));

        let embedtimeout = new EmbedBuilder()
          .setColor(embeds.color)
          .setDescription(`**You Can Use This Command Only 1 Time Everyday\n\nUse It Again In ${time}**`)
          .setFooter({ text: `${embeds.footer}` })
        return interaction.editReply({ embeds: [embedtimeout] })
      }


      if (sm_settings === "enable") {

        let check_sm = await settings.get(`${user.id}.safemode`)

        if (check_sm === undefined) check_sm = "disable";

        if (check_sm === "enable") return interaction.editReply("**safemode is already enabled 🔒**")

        await settings.set(`${user.id}.safemode`, sm_settings)

        await times.set(`${user.id}.sm_timeout`, Date.now())

        const embed = new EmbedBuilder()
          .setColor(embeds.color)
          .setDescription(`**Safemode Enabled Sucessfully 🔒**`)
          .setFooter({ text: `${embeds.footer}` });

        interaction.editReply({ embeds: [embed] })

      }

      if (sm_settings === "disable") {

        let check_sm = await settings.get(`${user.id}.safemode`)

        if (check_sm === undefined) check_sm = "disable";

        if (check_sm === "disable") return interaction.editReply("**safemode is already disabled 🔓**")

        await settings.set(`${user.id}.safemode`, sm_settings)

        await times.set(`${user.id}.sm_timeout`, Date.now())

        const embed = new EmbedBuilder()
          .setColor(embeds.color)
          .setDescription(`**Safemode Disabled Sucessfully 🔓**`)
          .setFooter({ text: `${embeds.footer}` });

        interaction.editReply({ embeds: [embed] })

      }

    }

    if (interaction.options.getSubcommand() === 'titles') {



      const db = require("./../database/connect.js");



      const user = interaction.user;

      const settings = db.table("settings");

      const titles = db.table("titles");

      const items = db.table("items");

      let register = await settings.get(`${user.id}.register`)

      if (register === undefined) register = 'false';

      if (register === 'false') {
        return interaction.editReply(`**${emojis.cross} Use /register To Register Your Account In My Database**`)
      }

      const title = interaction.options.getString('title');

      let phone = await items.get(`${user.id}.phone`)

      if (phone === undefined) phone = 0;


      if (phone === 0) {
        return interaction.editReply("**You Need A Phone To Use This Command. Tip: use /shop and /buy to buy a phone**")
      }

      if (title === "hallo22") {

        let hallo22 = await titles.get(`${user.id}.halloween_2022`)

        if (hallo22 === undefined) hallo22 = 'false';

        if (hallo22 === 'false') {
          interaction.editReply("**you didn't have this title**")
        } else {
          await settings.set(`${user.id}.title`, 'Halloween Player')
          interaction.editReply("**Successfully Set** ***Halloween Player*** **Title**")

        }

      }

      if (title === "robber") {

        let robber = await titles.get(`${user.id}.robber`)

        if (robber === undefined) robber = 'false';

        if (robber === 'false') {
          interaction.editReply("**you didn't have this title**")
        } else {
          await settings.set(`${user.id}.title`, 'Robber')
          interaction.editReply("**Successfully Set** ***Robber*** **Title**")

        }

      }

      if (title === "beggar") {

        let beggar = await titles.get(`${user.id}.beggar`)

        if (beggar === undefined) beggar = 'false';

        if (beggar === 'false') {
          interaction.editReply("**you didn't have this title**")
        } else {
          await settings.set(`${user.id}.title`, 'Poor Beggar')
          interaction.editReply("**Successfully Set** ***Poor Beggar*** **Title**")

        }

      }

      if (title === "criminal") {

        let criminal = await titles.get(`${user.id}.criminal`)

        if (criminal === undefined) criminal = 'false';

        if (criminal === 'false') {
          interaction.editReply("**you didn't have this title**")
        } else {
          await settings.set(`${user.id}.title`, 'Top Criminal')
          interaction.editReply("**Successfully Set** ***Top Criminal*** **Title**")

        }

      }

      if (title === "gambler") {

        let gambler = await titles.get(`${user.id}.gambler`)

        if (gambler === undefined) gambler = 'false';

        if (gambler === 'false') {
          interaction.editReply("**you didn't have this title**")
        } else {
          await settings.set(`${user.id}.title`, 'Pro Gambler')
          interaction.editReply("**Successfully Set** ***Pro Gambler*** **Title**")

        }

      }

      if (title === "king") {

        let king = await titles.get(`${user.id}.king`)

        if (king === undefined) king = 'false';

        if (king === 'false') {
          interaction.editReply("**you didn't have this title**")
        } else {
          await settings.set(`${user.id}.title`, 'The King')
          interaction.editReply("**Successfully Set** ***The King*** **Title**")

        }

      }

      if (title === "warrior") {

        let warrior = await titles.get(`${user.id}.warrior`)

        if (warrior === undefined) warrior = 'false';

        if (warrior === 'false') {
          interaction.editReply("you didn't have this title")
        } else {
          await settings.set(`${user.id}.title`, 'A Warrior')
          interaction.editReply("**Successfully Set** ***A Warrior*** **Title**")

        }

      }

      if (title === "gold_invest") {

        let gold_invest = await titles.get(`${user.id}.gold_invest`)

        if (gold_invest === undefined) gold_invest = 'false';

        if (gold_invest === 'false') {
          interaction.editReply("**you didn't have this title**")
        } else {
          await settings.set(`${user.id}.title`, 'Gold Investor')
          interaction.editReply("**Successfully Set** ***Gold Investor*** **Title**")

        }

      }


      if (title === "beta_tester") {

        let beta_tester = await titles.get(`${user.id}.beta_tester`)

        if (beta_tester === undefined) beta_tester = 'false';

        if (beta_tester === 'false') {
          interaction.editReply("**you didn't have this title**")
        } else {
          await settings.set(`${user.id}.title`, 'Beta Tester')
          interaction.editReply("**Successfully Set** ***Beta Tester*** **Title**")

        }

      }

    }

    if (interaction.options.getSubcommand() === 'bio') {

const db = require("./../database/connect.js");

const items = db.table('items');
const settings = db.table('settings');
      
let phone = await items.get(`${interaction.user.id}.phone`)

  if (phone === undefined) phone = 0;

if (phone === 0) {
  return interaction.editReply("You Need A Phone To Use This Command. Tip: use /shop and /buy to buy a phone")
}
    
const submitted_bio = interaction.options.getString('bio');


await settings.set(`${interaction.user.id}.bio`, submitted_bio)
    
		await interaction.editReply({ content: `**Your Profile Bio Changed To** ***${submitted_bio}*** **Successfully!**` });
      
    }

  },
};