//Ce dont le bot a besoins.
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client ();

//Permet de créer la fonctionalité de la sélection aléatoire de la maison du joueur.
function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(4);
    randnum = Math.floor(Math.random() * (max - min +1)+ min);

}
//JSON Files
let points = JSON.parse(fs.readFileSync('JSON/points.json', 'utf8'));

bot.on('ready', () => {
    bot.user.setActivity('vous aider');
    console.log('Je suis bien connecté')
});

bot.on('message', msg => {
    const guildMember = msg.member;
    
    //Créer les points de Serpentards.
    if (!points['Serpentard']) points['Serpentard'] = {}
    if (!points['Serpentard'].points) points['Serpentard'].points = 0.

    //Créer les points de Gryffondor.
    if (!points['Gryffondor']) points['Gryffondor'] = {}
    if (!points['Gryffondor'].points) points['Gryffondor'].points = 0.

    //Créer les points de Poufsouffle.
    if (!points['Poufsouffle']) points['Poufsouffle'] = {}
    if (!points['Poufsouffle'].points) points['Poufsouffle'].points = 0.

    //Créer les points de Serdaigle.
    if (!points['Serdaigle']) points['Serdaigle'] = {}
    if (!points['Serdaigle'].points) points['Serdaigle'].points = 0.

    //Attribue un PREFIX à notre bot.
    let prefix = "*"
    
    fs.writeFile('Storage/points.json', JSON.stringify(points), (err) => {
        if (err) console.error (err);
    })

    if (msg.content === "Ping") {
        msg.channel.send('Pong');
        console.log('Initialization du BOT.')
    }

    if (msg.content === prefix + "aide") {
        msg.channel.send({embed: {
            title: "Aide Philosophale",
            color: 0x00A1D7,
            fields: [{
                name: "Général",
                value: `!choipeaux | Permet d'être répartit dans une maison.
!balance | Permet de voir son compte bancaire.
!paye | Permet de reçevoir sa paye (Tout les 24h)
!points | Permet de voir le nombre de points de chaques maisons.`,
                inline: false
            },
            {
                name: "Professeur",
                value: `!agryffondor | Ajoute 10 points à Gryffondor.
!rgryffondor | Retire 10 points à Gryffondor.
!apoufsouffle | Ajoute 10 points à Poufsouffle.
!rpousouffle | Retire 10 points à Poufsouffle.
!aserdaigle | Ajoute 10 points à Serdaigle.
!rserdaigle | Retire 10 points à Serdaigle.
!aserpentard | Ajoute 10 points à Serpentard.
!rserpentard | Retire 10 points à Serpentard.`,
                inline: false
            }]
        }})
    }
    if(msg.content === prefix + "choipeaux") {
        if(msg.member.roles.get(process.env.ELEVE)) {
            msg.channel.send('Vous ne pouvez pas vous ré-atribuer une maison.');
            console.log(`Une personne a ré-essayer la commande "!choipeaux".`)
        }
        else
        {
            random()
            if (randnum ==1) {
                msg.reply("Sage es-tu... Je ne vois qu'une option... SERDAIGLE !");
                guildMember.addRoles([process.env.SERDAIGLE, process.env.ELEVE])
                console.log(`${msg.author.username} est devenu Serdaigle.`);
            }
            if (randnum ==2) {
                msg.reply("Ambitieux est-tu... Seul... SERPENTARD pourras t'aider à grandir sur le chemin de la Puissance Ultime !");
                guildMember.addRoles([process.env.SERPENTARD, process.env.ELEVE])
                console.log(`${msg.author.username} est devenu Serpentard.`);
            }
            if (randnum ==3) {
                msg.reply("Courageux es-tu... Je vois la seule maison qui t'acceptera... GRYFFONDOR !");
                guildMember.addRoles([process.env.GRYFFONDOR, process.env.ELEVE])
                console.log(`${msg.author.username} est devenu Gryffondor.`);
            }
            if (randnum ==4) {
                msg.reply("Modeste es-tu... Je crois, que seul POUFSOUFFLE aura le charme de te faire aimer Poudlard !");
                guildMember.addRoles([process.env.POUFSOUFFLE, process.env.ELEVE])
                console.log(`${msg.author.username} est devenu Poufsouffle.`);
            }
        }
    }
    if (msg.content === prefix + "rserdaigle") {
        if (msg.member.roles.get(process.env.PROFESSEUR)) {
            msg.reply('Retrait de 10 points pour Serdaigle !')
            points['Serdaigle'].points -= 10;
        }
    }
    
    if (msg.content === prefix + "aserdaigle") {
        if (msg.member.roles.get(process.env.PROFESSEUR)) {
            msg.reply('Ajout de 10 points pour Serdaigle !')
            points['Serdaigle'].points += 10;
        }
    }

    if (msg.content === prefix + "rpoufsouffle") {
        if (msg.member.roles.get(process.env.PROFESSEUR)) {
            msg.reply('Retrait de 10 points pour Poufsouffle !')
            points['Poufsouffle'].points -= 10;
        }
    }
    
    if (msg.content === prefix + "apoufsouffle") {
        if (msg.member.roles.get(process.env.PROFESSEUR)) {
            msg.reply('Ajout de 10 points pour Poufsouffle !')
            points['Poufsouffle'].points += 10;
        }
    }
    
    if (msg.content === prefix + "rserpentard") {
        if (msg.member.roles.get(process.env.PROFESSEUR)) {
            msg.reply('Retrait de 10 points pour Serpentard !')
            points['Serpentard'].points -= 10;
        }
    }

    if (msg.content === prefix + "aserpentard") {
        if (msg.member.roles.get(process.env.PROFESSEUR)) {
            msg.reply('Ajout de 10 points pour Serpentard !')
            points['Serpentard'].points += 10;
        }
    }

    if (msg.content === prefix + "rgryffondor") {
        if (msg.member.roles.get(process.env.PROFESSEUR)) {
            msg.reply('Retrait de 10 points pour Gryffondor !')
            points['Gryffondor'].points -= 10;
        }
    }
    
    
    if (msg.content === prefix + "agryffondor") {
        if (msg.member.roles.get(process.ENV.PROFESSEUR)) {
            msg.reply('Ajout de 10 points pour Gryffondor !')
            points['Gryffondor'].points += 10;
        }
    }

    if (msg.content === prefix + "points") {
        msg.channel.send({embed: {
            title: "Points",
            color: 0x00A1D7,
            fields: [{
                name: "Serpentard",
                value: points['Serpentard'].points,
                inline: true
            },
            {
                name: "Gryffondor",
                value: points['Gryffondor'].points,
                inline: true
            },
            {
                name: "Poufsouffle",
                value: points['Poufsouffle'].points,
                inline: true
            },
            {
                name: "Serdaigle",
                value: points['Serdaigle'].points,
                inline: true
            }]
        }})
    }

});