import fetch from 'node-fetch';
import 'dotenv';
import { Client } from 'discord.js';
const client = new Client();
const PREFIX = '!';

async function getChampBuild (champ,msg)  {
    fetch(`https://lolimagaria.herokuapp.com/champ/${champ}`)
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

client.login('NzkwOTI4ODY5MzE4MTk3MjUy.X-Hv6Q.lGyU_F1GMGhvoBCbRVyJ_yrXbbM');