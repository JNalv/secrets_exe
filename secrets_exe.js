var Twit = require('twit');
var credentials = require('./credentials.js');
var shuffle = require('shuffle-array')

var T = new Twit({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token: credentials.access_token,
    access_token_secret: credentials.access_token_secret
});

var secrets, incoming, outgoing, yentaID

newDM = '@blinsay is a reptiloid.'

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
//console.log(nextDM);
//console.log(secrets);
//secrets.push(newDM);
//console.log(secrets);

var stream = T.stream('user');

stream.on('direct_message', function (directMsg) {

//if (DM.sender_screen_name != "JNalv"){

console.log(directMsg);

//} 
}
)