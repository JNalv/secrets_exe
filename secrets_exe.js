var Twit = require('twit');
var credentials = require('./credentials.js');
var shuffle = require('shuffle-array');
var _ = require('underscore');

var T = new Twit({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token: credentials.access_token,
    access_token_secret: credentials.access_token_secret
});

var secrets, incoming, outgoing, yentaID

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

var friends, followers, to_follow, to_unfollow, mutuals

var find_followers = function() {
    T.get('followers/ids', {
        screen_name: 'whoishome'
    }, function(err, data, response) {
        followers = data.ids;
        console.log('Followed by: ' + followers);
        find_friends();
    });
}

var find_friends = function() {
    T.get('friends/ids', {
        screen_name: 'whoishome'
    }, function(err, data, response) {
        friends = data.ids;
        console.log('Following: ' + friends);
        calculate_bros();
    });
}

// TO-DO:
// FIND PENDING FOLLOWS
// REMOVE THOSE GUYS FROM to_follow
// https://dev.twitter.com/rest/reference/get/friendships/outgoing

var calculate_bros = function() {
    mutuals = _.intersection(friends, followers);
    console.log('Mutuals: ' + mutuals);
    to_follow = _.difference(followers, mutuals);
    console.log('To Follow: ' + to_follow);
    to_unfollow = _.difference(friends, mutuals);
    console.log('To Unfollow: ' + to_unfollow);
    followback();
}

var followback = function() {
    for (i = 0; i < to_follow.length; i++) {
        new_friend = String(to_follow[i]);
        T.post('friendships/create', {
                user_id: new_friend
            }, function(err, data, response) {
                console.log(err);
            })

}
}

var unfollow = function() {
    for (i = 0; i < to_unfollow.length; i++) {
        new_unfollow = String(to_unfollow[i]);
        T.post('friendships/destroy', {
                user_id: new_unfollow
            }, function(err, data, response) {
                console.log(err);
            }
        )}
beginstream();
}

var stream = T.stream('user');

var beginstream = function() {
    console.log("Starting stream...");
    stream.on('direct_message', function(directMsg) {

        //if (DM.sender_screen_name != "JNalv"){

        console.log(directMsg);

        //} 
    })
}

setInterval(function() {
    stream.stop();
    find_followers();
    // vvvvvvv THIS LINE SETS THE INTERVAL! REMEMBER, BRO! vvvvvvv
}, 10000);