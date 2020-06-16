const Discord = require('discord.js')
const client = new Discord.Client()
const prefix = `.`
const {token} = require(`./config.json`)
// FS => Enregistrer la bdd
const fs = require(`fs`)
//Bdd => Stocker des données
const date = require(`./storage/birthday.json`)

client.login(`TOKEN`)

client.on(`ready`, () => {
    //Envoyer un message dans la console
    console.log(`Je suis prêt !`)
    console.log(client.user.tag)
    console.log(client.user.id)
    //Active le jeu
    client.user.setActivity(`Classe Bot`)

})

client.on(`message`, message => {
   //Anti-Bot
   if(message.author.bot) return

   //Enregistrer la date
   if(message.content.startsWith(prefix + `date`)) {
       const args = message.content.replace(prefix + `date`,``).replace(` `,``)
       if(!args[0]) return message.reply(`Veuillez spécifier une date!`)
       //enrigistrer
       date[message.author.id] = {
           date: args
       }
       fs.writeFile(`storage/birthday.json`, JSON.stringify(date), err => {
        if(err) console.log(err)
        })
       message.reply(`Vous êtes enregistré! Vous êtes né(e) le : \`${date[message.author.id].date}\``)
   }
   //Afficher la date
   if(message.content === prefix + `annif`) {
       //Verifier si l'utilisateur est dans la bdd
    if(!date[message.author.id]) {
           return message.reply(`Vous n'êtes pas dans la bdd! Faites \`.date [DD/MM/YYYY]\``)
       }
       message.reply(`Vous êtes né(e) le: \`${date[message.author.id].date}\``)
   }
   
})

