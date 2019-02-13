class Leaderboard {
    constructor() {
        this.leaderboard = [];
    }

    addResult(twitch, name, score, country) {
        this.leaderboard.push([true, twitch, name, score, country]);
        
        this.leaderboard.sort((r1, r2) => r2[3] - r1[3]);
    }

    removeResult(index) {
        this.leaderboard.splice(index - 1, 1);
    }

    withdraw(index) {
        this.leaderboard[index - 1][0] = false;
    }

    indexOf(name) {
        for (let i = 0; i < this.leaderboard.length; i++) {
            if (this.leaderboard[i][0] == name || this.leaderboard[i][1] == name)
                return i;
        }
        return -1;
    }

    convertToTable() {
        let f = [["#", "Twitch", "Name", "Score", "Country"]]

        let invalids = 0;

        for (let i = 0; i < this.leaderboard.length; i++) {

            let r = this.leaderboard[i].slice();
            if (r[0])
                r[0] = i + (1 - invalids);
            else {
                r[0] = "-";
                r[3] += "*";
                invalids++;
            }

            f.push(r);
        }

        for (let i = this.leaderboard.length; i < 16; i++) {
            f.push([i + 1, "", "", "", ""]);
        }
        return f;
    }



    // TESTING
    addRandomResult() {
        let username = "";
        let name = "";
        let country = "";

        let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_";

        let l1 = Math.floor(Math.random() * 12) + 3;
        let l2 = Math.floor(Math.random() * 12  ) + 3;
        let l3 = Math.floor(Math.random() * 16) + 3;
        for (let i = 0; i < l1; i++)
            username += char[Math.floor(Math.random() * 63)];
        for (let i = 0; i < l2; i++)
            name += char[Math.floor(Math.random() * 63)];
        for (let i = 0; i < l3; i++)
            country += char[Math.floor(Math.random() * 52)];

        let score = Math.floor(Math.random() * 900000) + 100000;

        this.addResult(username, name, score, country);
    }

}

module.exports = Leaderboard;