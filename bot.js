// import fetch from 'node-fetch';
const fetch = require('node-fetch')
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = '#';
const express = require('express');
const app = express();

app.listen(process.env.PORT || 5000)

async function getChampBuild (champ,msg)  {
    await fetch(`https://lolimagaria.herokuapp.com/champ/${champ}`)
    .then(data => {
        let build = data.json()
        .then(data => {
            let text = '';
            const send = [];
            for(let key in data) {
                if(Array.isArray(data[key])) {
                    let joined = [];
                    for(let value of data[key]) {
                        joined.push(value.replace(/ /g, '-'));
                    }
                    let joinedFull = [];
                    for(let value of joined) {
                        if(value === "Doran's-Blade\n2") {
                            value = "Doran's-Blade";
                        }
                        joinedFull.push(value.replace(/'/g, ''));
                    }
                    const items = data[key];
                    let finalItems = [];
                    for(let i = 0; i < items.length; i++) {
                        finalItems[i] = "http://mobafire.com/images/item/" + joinedFull[i] + ".gif" + "\n" + "```" + items[i] + "```" +"\n";
                    }
                    text = 
                    "```" 
                    + 
                    `CSS

                    ${key}:`
                    +
                    "```"
                    +
                    `**${finalItems.join('')}**
                    `
                }
                msg.channel.send(text);
            }
        })
    })
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', msg => {
    if(msg.content.substring(0,1) === PREFIX) {
        let champ = msg.content.substring(1,msg.content.length)
        getChampBuild(champ,msg)
    }
});
client.login(process.env.BOT_TOKEN);