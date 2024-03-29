const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const values = require("./../JSON/values.json");
const prices = require("./../JSON/prices.json");
const desc = require("./../JSON/items-desc.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('item')
		.setDescription('📱 see your all item')
  .addStringOption(option => option.setName('item').setDescription('Give Me A Item To See').setRequired(true)
  .addChoices(
				{ name: 'Phone', value: 'phone' },
				{ name: 'Laptop', value: 'laptop' },
				{ name: 'Shovel', value: 'shovel' },
    { name: 'Fishing Rod', value: 'rod' },
{ name: 'Bank Upgrader', value: 'bank' },
    { name: 'Junk', value: 'junk' },
    { name: 'Common Fish', value: 'common' },
    { name: 'Uncommon Fish', value: 'uncommon' },
    { name: 'Rare Fish', value: 'rare' },
    { name: 'Legendary Fish', value: 'legendary' },
    { name: 'Dirt', value: 'dirt' },
    { name: 'Sand', value: 'sand' },
    { name: 'Worm', value: 'worm' },
    { name: 'Iron', value: 'iron' },
    { name: 'Fossil', value: 'fossil' },
    { name: 'Toilet Paper', value: 'toilet_paper' },
    { name: 'Cool Meow', value: 'cool_meow' },
    { name: 'Troll Sword', value: 'troll_sword' },
    { name: 'Golden Troll Coin', value: 'golden_troll_coin' },
    { name: 'Troll Crown', value: 'troll_crown' },
    { name: 'Starter Kit', value: 'starter_kit' },
{ name: "Jack-o'-lantern", value: "jacko" },
    { name: "Gift Box", value: "giftbox" },
)),
                   
	async execute(interaction, client) {

const db = require("./../database/connect.js");


    const currency = db.table("currency");
    
const settings = db.table("settings");

const items = db.table("items");

    const user = interaction.user;

let register = await settings.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`**${emojis.cross} Use /register To Register Your Account In My Database**`);
    }

const item = interaction.options.getString('item');

if (item === "phone") {

let phones = await items.get(`${user.id}.phone`)

if (phones === undefined) phones = 0;

const embedph = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.phone} Phone (${phones})**`)
  .setDescription(`**Buy - ${emojis.troll_coin} ${prices.phone}
Sell Value - ${emojis.troll_coin} ${values.phone}

Description - ${desc.phone}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedph]});

}

if (item === "laptop") {

let laptops = await items.get(`${user.id}.laptop`)

if (laptops === undefined) laptops = 0;

const embedlp = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.laptop} Laptop (${laptops})**`)
  .setDescription(`**Buy - ${emojis.troll_coin} ${prices.laptop}
Sell Value - ${emojis.troll_coin} ${values.laptop}

Description - ${desc.laptop}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedlp]});

  }

if (item === "shovel") {

let shovels = await items.get(`${user.id}.shovel`)

if (shovels === undefined) shovels = 0;

const embedsh = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.shovel} Shovel (${shovels})**`)
  .setDescription(`**Buy - ${emojis.troll_coin} ${prices.shovel}
Sell Value - ${emojis.troll_coin} ${values.shovel}

Description - ${desc.shovel}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedsh]});

}

if (item === "rod") {

let rods = await items.get(`${user.id}.fishing_rod`)

if (rods === undefined) rods = 0;

const embedfr = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.fishing_rod} Fishing Rod (${rods})**`)
  .setDescription(`**Buy - ${emojis.troll_coin} ${prices.fishing_rod}
Sell Value - ${emojis.troll_coin} ${values.fishing_rod}

Description - ${desc.fishing_rod}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedfr]});

}

if (item === "bank") {

let banks = await items.get(`${user.id}.bank_upgrader`)

if (banks === undefined) banks = 0;

const embedbank = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.bank_upgrader} Bank Upgrader (${banks})**`)
  .setDescription(`**Buy - ${emojis.troll_coin} ${prices.bank_upgrader}
Sell Value - ${emojis.troll_coin} ${values.bank_upgrader}

Description - ${desc.bank_upgrader}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedbank]});

  }

    if (item === "junk") {

let junks = await items.get(`${user.id}.junk`)

if (junks === undefined) junks = 0;

const embedjunk = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.junk} Junk (${junks})**`)
  .setDescription(`**Buy - Unable To Be Bought 
Sell Value - ${emojis.troll_coin} ${values.junk}

Description - ${desc.junk}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedjunk]});

    }

if (item === "common") {

let commons = await items.get(`${user.id}.common_fish`)

if (commons === undefined) commons = 0;

const embedcf = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.common_fish} Common Fish (${commons})**`)
  .setDescription(`**Buy - Unable To Be Bought 
Sell Value - ${emojis.troll_coin} ${values.common_fish}

Description - ${desc.common_fish}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedcf]});

}

if (item === "uncommon") {

let uncommons = await items.get(`${user.id}.uncommon_fish`)

if (uncommons === undefined) uncommons = 0;

const embeducf = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.uncommon_fish} Uncommon Fish (${uncommons})**`)
  .setDescription(`**Buy - Unable To Be Bought 
Sell Value - ${emojis.troll_coin} ${values.uncommon_fish}

Description - ${desc.uncommon_fish}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embeducf]});

}
    
if (item === "rare") {

let rares = await items.get(`${user.id}.rare_fish`)

if (rares === undefined) rares = 0;

const embedrf = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.rare_fish} Rare Fish (${rares})**`)
  .setDescription(`**Buy - Unable To Be Bought 
Sell Value - ${emojis.troll_coin} ${values.rare_fish}

Description - ${desc.rare_fish}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedrf]});

}


if (item === "legendary") {

let legendarys = await items.get(`${user.id}.legendary_fish`)

if (legendarys === undefined) legendarys = 0;

const embedlf = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.legendary_fish} Legendary Fish (${legendarys})**`)
  .setDescription(`**Buy - Unable To Be Bought 
Sell Value - ${emojis.troll_coin} ${values.legendary_fish}

Description - ${desc.legendary_fish}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedlf]});

}

if (item === "dirt") {

let dirts = await items.get(`${user.id}.dirt`)

if (dirts === undefined) dirts = 0;

const embeddirt = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.dirt} Dirt (${dirts})**`)
  .setDescription(`**Buy - Unable To Be Bought 
Sell Value - ${emojis.troll_coin} ${values.dirt}

Description - ${desc.dirt}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embeddirt]});

}

if (item === "sand") {

let sands = await items.get(`${user.id}.sand`)

if (sands === undefined) sands = 0;

const embedsand = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.sand} Sand (${sands})**`)
  .setDescription(`**Buy - Unable To Be Bought 
Sell Value - ${emojis.troll_coin} ${values.sand}

Description - ${desc.sand}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedsand]});

}
    
if (item === "worm") {

let worms = await items.get(`${user.id}.worm`)

if (worms === undefined) worms = 0;

const embedworm = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.worm} Worm (${worms})**`)
  .setDescription(`**Buy - Unable To Be Bought 
Sell Value - ${emojis.troll_coin} ${values.worm}

Description - ${desc.worm}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedworm]});

}

if (item === "iron") {

let irons = await items.get(`${user.id}.iron`)

if (irons === undefined) irons = 0;

const embediron = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.iron} Iron (${irons})**`)
  .setDescription(`**Buy - Unable To Be Bought 
Sell Value - ${emojis.troll_coin} ${values.iron}

Description - ${desc.iron}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embediron]});

  }

if (item === "fossil") {

let fossils = await items.get(`${user.id}.fossil`)

if (fossils === undefined) fossils = 0;

const embedfs = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.fossil} Fossil (${fossils})**`)
  .setDescription(`**Buy - Unable To Be Bought 
Sell Value - ${emojis.troll_coin} ${values.fossil}

Description - ${desc.fossil}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedfs]});

}

if (item === "toilet_paper") {

let toilets = await items.get(`${user.id}.toilet_paper`)

if (toilets === undefined) toilets = 0;

const embedtp = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.toilet_paper} Toilet Paper (${toilets})**`)
  .setDescription(`**Buy - ${emojis.troll_coin} ${prices.toilet_paper}
Sell Value - ${emojis.troll_coin} ${values.toilet_paper}

Description - ${desc.toilet_paper}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedtp]});

  }

if (item === "cool_meow") {

let cools = await items.get(`${user.id}.cool_meow`)

if (cools === undefined) cools = 0;

const embedcool = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.cool_meow} Cool Meow (${cools})**`)
  .setDescription(`**Buy - ${emojis.troll_coin} ${prices.cool_meow}
Sell Value - ${emojis.troll_coin} ${values.cool_meow}

Description - ${desc.cool_meow}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedcool]});

}

if (item === "troll_sword") {

let swords = await items.get(`${user.id}.troll_sword`)

if (swords === undefined) swords = 0;

const embedsword = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.troll_sword} Troll Sword (${swords})**`)
  .setDescription(`**Buy - ${emojis.troll_coin} ${prices.troll_sword}
Sell Value - ${emojis.troll_coin} ${values.troll_sword}

Description - ${desc.troll_sword}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedsword]});

}

if (item === "golden_troll_coin") {

let gcoins = await items.get(`${user.id}.golden_troll_coin`)

if (gcoins === undefined) gcoins = 0;

const embedgtc = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.golden_troll_coin} Golden Troll Coin (${gcoins})**`)
  .setDescription(`**Buy - ${emojis.troll_coin} ${prices.golden_troll_coin}
Sell Value - ${emojis.troll_coin} ${values.golden_troll_coin}

Description - ${desc.golden_troll_coin}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedgtc]});

}
    
if (item === "troll_crown") {

let crowns = await items.get(`${user.id}.troll_crown`)

if (crowns === undefined) crowns = 0;

const embedcrown = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.troll_crown} Troll Crown (${crowns})**`)
  .setDescription(`**Buy - ${emojis.troll_coin} ${prices.troll_crown}
Sell Value - ${emojis.troll_coin} ${values.troll_crown}

Description - ${desc.troll_crown}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedcrown]});

}

if (item === "starter_kit") {

let starter_kits = await items.get(`${user.id}.starter_kit`)

if (starter_kits === undefined) starter_kits = 0;

const embedstkit = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.starter_kit} Starter Kit (${starter_kits})**`)
  .setDescription(`**Buy - Unable To Be Bought
Sell Value - Unable To Be Sold

Description - ${desc.starter_kit}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedstkit]});

}

if (item === "jacko") {

let jacko = await items.get(`${user.id}.Jacko_lantern`)

if (jacko === undefined) jacko = 0;

const embedjacko = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.jacko} Jack-o'-lantern (${jacko})**`)
  .setDescription(`**Buy - Unable To Be Bought
Sell Value - ${emojis.troll_coin} ${values.jacko}

Description - ${desc.jacko}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedjacko]});

}

if (item === "giftbox") {

let giftbox = await items.get(`${user.id}.giftbox`)

if (giftbox === undefined) giftbox = 0;

const embedgiftbox = new EmbedBuilder()
  .setColor(embeds.color)
  .setTitle(`**${emojis.giftbox} Gift Box (${giftbox})**`)
  .setDescription(`**Buy - Unable To Be Bought
Sell Value - Unable To Be Sold

Description - ${desc.giftbox}**`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embedgiftbox]});

}
    
	},
}