const fs = require("fs");
var table = require('markdown-table')

const Discord = require("discord.js");
const client = new Discord.Client();

let variables = {
    editLeaderboard: "testing",

    serverID: "543873539313369104",

    leaderboardChannelID: "544553373433856000",
    leaderboardID: "544579310535835670"
}


let token = fs.readFileSync("input_files/oauth-key.txt", "utf-8");
console.log(token);

let board = [
    [1, "vandweller", "vandweller", 0, "USA"],
    [2, "Professor_L_Tetris", "Elle", 0, "USA"]
]

function generateLeaderboardTable(leaderboard) {
    leaderboard = leaderboard.slice();

    let t = [["#", "Twitch", "Name", "Score", "Country"]];

    for (let i = 0; i < leaderboard.length; i++)
        leaderboard[i][3] = Math.floor(Math.random() * 900000) + 100000;

    leaderboard.sort((s1, s2) => {
        return s2[3] - s1[3];
    });

    for (let i = 0; i < leaderboard.length; i++)
        t.push(leaderboard[i].slice());

    for (let i = t.length; i < 16; i++) {
        t.push([i + 1, "", "", "", ""]);
    }

    return "```\n" + table(t) + "\n```";
}





client.on("ready", () => {

    console.log("Connected!");

});

client.on("message", (message) => {
    if (message.content == ".test") 
        message.channel.send("We're up and running!");

    if (message.channel.name == variables.editLeaderboard) {
        if (message.content == ".updateleaderboardtest") {
            let c = client.guilds.get(variables.serverID).channels.get(variables.leaderboardChannelID);
            c.fetchMessage(variables.leaderboardID).then((m) => {
                m.edit(generateLeaderboardTable(board));
            });
        }
    }

});

client.login(token);