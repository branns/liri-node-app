var req = require('request');

var fs = require('fs');

var keyFile = require('./keys.js');

var Spotify = require("node-spotify-api");

var Twitter = require("twitter");

var client = new Twitter(keys.twitterKeys);

var command = process.argv[2];

var anotherCommand = process.argv[3];

var spotify = new Spotify({
	id: "5e14209e9c7b46ef8cd8c9800823a794",
	secret: "d85940bbd396480187d214171fe03534", 
});

//liri commands and variables
// var liriCommands = {
// 	twitter: 'my-tweets',
// 	spotify: 'spotify-this-song',
// 	omdb: 'movie-this',
// 	random: 'do-what-it-says'
// }

// twitter
if (command === "my-tweets") {
    var params = { screen_name: 'serverson_ann', count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            for (i = 0; i < tweets.length; i++) {
                console.log("Tweet # " + (i + 1) + " of 20");
                console.log("Tweet created at: " + tweets[i].created_at);
                console.log("Tweet: " + tweets[i].text);
                console.log("-------------------------");
            }
        }
    });
}
// spotify 
if (command === "spotify-this-song") {
    spotify.search({ type: 'track', query: anotherCommand }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
    });
// default the sign
} else {
	console.log(random.txt);
}
// omdb 
if (command === "movie-this") {
    //run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + anotherCommand + "&y=&plot=short&apikey=40e9cece";

    request(queryUrl, function (error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("\nReleased: " + JSON.parse(body).Year);
            console.log("\nIMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("\nCountry Produced: " + JSON.parse(body).Country);
            console.log("\nLanguage: " + JSON.parse(body).Language);
            console.log("\nPlot: " + JSON.parse(body).Plot);
            console.log("\nActors: " + JSON.parse(body).Actors);
            console.log("\nTomatometer: " + JSON.parse(body).Ratings[1].Value);
            console.log("\nRT URL: " + JSON.parse(body).Website);
        } else {
        	console.log("Mr.Nobody")
        	console.log("\nIf you haven't watched 'Mr. Nobody,' then you should:<http://www.imdb.com/title/tt0485947/>")
        	console.log("\n It's on Netflix!")
        }
    });
}
// write .txt file callback
if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, text) {
        if (err) {
            return console.log(err);
        }
        // console.log(text);
        spotify.search({ type: 'track', query: text }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            // console.log(data);
            console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview: " + data.tracks.items[0].preview_url);
        });
    });
}

