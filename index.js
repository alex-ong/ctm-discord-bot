const fs = require("fs");
const table = require('markdown-table');
const Leaderboard = new require("./classes/leaderboard");

const Discord = require("discord.js");
const client = new Discord.Client();

let variables = {
    editLeaderboard: "testing",

    serverID: "543873539313369104",

    leaderboardChannelID: "544553373433856000",
    leaderboardID: "544579310535835670"
}

const token = fs.readFileSync("input_files/oauth-key.txt", "utf-8");


let Board = new Leaderboard();

function getLeaderboardMessage() {
    return "```xl\n" + table(Board.convertToTable()) + "\n```";
}

function updateLeaderboardMessage() {
    client.channels.get(variables.leaderboardChannelID).fetchMessage(variables.leaderboardID).then((message) => {
        message.edit(getLeaderboardMessage());
    });
}

function addResultCommand(s) {

    let args = s.split(" ");

    if (args.length != 4)
        return "Invalid arguments.";
    
    args[2] = parseInt(args[2].split(",").join(""));
    if (!args[2])
        return "Invalid arguments.";
    
    if (Board.indexOf(args[0]) != -1 || Board.indexOf(args[1]) != -1)
        return "Someone with that name is already on the leaderboard!";
    
    Board.addResult(args[0], args[1], args[2], args[3]);
    
    updateLeaderboardMessage();

    return "Result added!";
}

function removeResultCommand(i) {
    i = parseInt(i);
    if (!i || Board.leaderboard.length >= i)
        return "Invalid index.";

    Board.removeResult(i);
    
    updateLeaderboardMessage();

    return "Result removed!";
}



client.on("ready", () => {

    console.log("Connected!");

});

client.on("message", (message) => {
    if (message.content == ".test") 
        message.channel.send("We're up and running!");

    if (message.channel.name == variables.editLeaderboard) {
        if (message.content.startsWith(".add ") || message.content.startsWith(".addresult "))
            message.channel.send(addResultCommand(message.content.substring(message.content.indexOf(" ") + 1)));
        
        if (message.content.startsWith(".remove ") || message.content.startsWith(".removeresult "))
            message.channel.send(removeResultCommand(message.content.substring(message.content.indexOf(" ") + 1)));
    }

});

client.login(token);