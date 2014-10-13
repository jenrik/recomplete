var util = require("util");
var twitter = require("twitter");
var twit = new twitter({
	"consumer_key": process.env["consumerKey"],
	"consumer_secret": process.env["consumerSecret"],
	"access_token_key": process.env["accessTokenKey"],
	"access_token_secret": process.env["accessTokenSecret"]
});

var regex = "I completed the campaign \".*?\" by @\\S*? in @redirectiongame";

twit.stream("user", { track: "@redirectiongame" }, function(stream) {
	stream.on("data", function(data) {
		if (data.text !== undefined) {
			if (data.text.match(regex) !== null) {
				twit.post("/statuses/retweet/" + data["id_str"] + ".json", function() {});
			}
		}
	});
});
