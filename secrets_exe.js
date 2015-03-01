// Twitter modules
var Twit = require('twit');
var credentials = require('./credentials.js');

// Handy modules
var shuffle = require('shuffle-array');
var _ = require('underscore');

// Make Twitter a thing
var T = new Twit({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token: credentials.access_token,
    access_token_secret: credentials.access_token_secret
});

// Secret exchange vars
var secrets, incoming, outgoing, yenta_id

// Social vars
var friends, followers, pendings, mutuals, to_follow_true, to_unfollow

incoming = '@blinsay is a reptiloid.'

secrets = [

    "AAA",
    "BBB",
    "CCC",
    "111",
    "222",
    "333"

]

//console.log(secrets);
//shuffle(secrets);
//console.log(secrets);
//nextDM = secrets.pop();
//console.log(outgoing);
//console.log(secrets);
//secrets.push(incoming);
//console.log(secrets);

// Find people following

var find_followers = function() {
    T.get('followers/ids', {
        screen_name: 'whoishome'
    }, function(err, data, response) {
        followers = data.ids;
        console.log('Followed by: ' + followers);
        find_friends();
    });
}

// Find people the bot follows, then calls find_pendings()

var find_friends = function() {
    T.get('friends/ids', {
        screen_name: 'whoishome'
    }, function(err, data, response) {
        friends = data.ids;
        console.log('Friends (who I am following): ' + friends);
        find_pendings();
    });
}

// Find locked accounts for whom the bot's follow request is still pending
// then calls calculate_bros()

var find_pendings = function() {
    T.get('friendships/outgoing', {
        stringify_ids: true
    }, function(err, data, response) {
        pendings = data.ids;
        console.log('Pending requests: ' + pendings);
        calculate_bros();
    });
}

// Compare arrays to see who to follow, who to unfollow, and
// accounts to ignore (follow requests still pending), then calls followback()

var calculate_bros = function() {
    mutuals = _.intersection(friends, followers);
    console.log('Mutuals: ' + mutuals);
    to_follow = _.difference(followers, mutuals);
    console.log('To Follow: ' + to_follow);
    to_unfollow = _.difference(friends, mutuals);
    console.log('To Unfollow: ' + to_unfollow);

    // This bit removes pending requests from the list of people to follow

   for (i = 0; i < pendings.length; i++) {
   		var remove = parseInt(pendings[i]);
    	to_follow = _.without(to_follow, remove);
    	console.log(to_follow);
        }
        followback();
}

// Loops through list of people to follow (if there are any), and follows each
// then calls unfollow()

var followback = function() {
    if (to_follow != '' || undefined) {
        for (i = 0; i < to_follow.length; i++) {
            new_friend = String(to_follow[i]);
            T.post('friendships/create', {
                user_id: new_friend
            }, function(err, data, response) {
                console.log(err);
            })

        }
    }
    unfollow();
}

// Loops through list of people to unfollow (if there are any), and unfollows each
// then calls secret_swap()

var unfollow = function() {
    if (to_unfollow != '' || undefined) {
        for (i = 0; i < to_unfollow.length; i++) {
            new_unfollow = String(to_unfollow[i]);
            T.post('friendships/destroy', {
                user_id: new_unfollow
            }, function(err, data, response) {
                console.log(err);
            })
        }
    }
    secret_swap();
}

// Defines what to stream on

var stream = T.stream('user');

// 

var secret_swap = function() {
    console.log("Starting stream...");
    stream.on('direct_message', function(directMsg) {

        //if (DM.sender_screen_name != "JNalv"){

        console.log(directMsg);

        //} 
    })
}

// Stops the stream (friends + follows are loaded on start, don't refresh mid-stream),
// then starts the cascade of social functions

setInterval(function() {
    stream.stop();
    find_followers();
    // vvvvvvv THIS LINE SETS THE INTERVAL! REMEMBER, BRO! vvvvvvv
}, 5000);