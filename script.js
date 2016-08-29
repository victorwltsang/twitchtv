$(document).ready(function() {
    var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "comster404", "freecodecamp", "storbeck", "2ggaming", "mushisgosu", "esl_overwatch", "brunofin", "joshog"];
    var all = [],
        online = [],
        offline = [];

    var twitch = function(username) {
        var urlS = "https://api.twitch.tv/kraken/streams/" + username + "?callback=?";
        var urlC = "https://api.twitch.tv/kraken/channels/" + username + "?callback=?";

        var status = $.getJSON(urlS);
        var channel = $.getJSON(urlC);

        $.when(status, channel).done(function(status, channel) {
            var stat = status[0],
                chan = channel[0];

            if (chan.logo == undefined) {
                chan.logo = "unknown.jpg";
            }
            var logo = `<img src = '${chan.logo}' class = 'logo'/>`;

            if (chan.url) {
                var url = `<a href = '${chan.url}' target='_blank'>`;

            } else {
                var url = `<a href = '#'>`;
            }
            console.log(url);
            var status = "";
            var dot = "";

            if (stat.stream === null) {
                status = "Offline";
                dot = "red";
            } else if (stat.stream) {
                status = chan.status;
                dot = "green";
            } else if (stat.status === 422) {
                status = stat.message;
                dot = "red";
            }

            /* create 3 myData list, one for all, one for online, one for offline. Onlick will empty and append that list */

            var myData = `<tr> <td>${logo}</td> <td>${url}${chan.name || " "}</a></td> <td>${status}</td> <td class='${dot}'></td> </tr>`;

            if (dot === "green") {
                online.push(myData);
            } else if (dot === "red") {
                offline.push(myData);
            }



            $(".online").on("click", function() {
                $("tbody").empty();
                var join = online.join("");
                $("tbody").append(join);

            });

            $(".offline").on("click", function() {
                $("tbody").empty();
                var join = offline.join("");
                $("tbody").append(join);

            });

            $(".all").on("click", function() {
                $("tbody").empty();
                var join = online.concat(offline).join("");
                $("tbody").append(join);

            }).trigger('click');

        });

    };
    usernames.forEach(twitch);

});
