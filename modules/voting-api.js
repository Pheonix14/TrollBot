const Topgg = require("@top-gg/sdk")
const express = require("express")
const config = require("./../config/config.json")
const { EmbedBuilder } = require("discord.js")
const app = express()
const webhook = new Topgg.Webhook(config.webhook_key)

module.exports = client => {
  
client.once('ready', () => {
  
console.log("Starting Voting Webhook...");

app.post("/dblwebhook", webhook.listener( async (vote) => {

const db = require("./../database/connect.js")

const items = db.table("items");
  
const currency = db.table("currency");

  const user = await client.users.fetch(vote.user);

  if (user === null) return;

  await items.add(`${user.id}.bank_upgrader`, 2)
await currency.add(`${user.id}.inventory_worth`, 30000)
await currency.add(`${user.id}.balance`, 50000)

const embed = new EmbedBuilder()
  .setColor("#FF7518")
    .setTitle(`Thanks For Voting`)
.setDescription("**You just got your** `50k Troll Coins, 2 Bank Upgraders` **for voting on top.gg!**");

await user.send({embeds: [embed]})

console.log(`successfully added vote reward to ${user.username}(${user.id})`)
  
}))

app.listen(80)
  
console.log(`➥ Webhook Listening On Port 80`)
     
});
  
}