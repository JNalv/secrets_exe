var Twit = require('twit');
var keys = require('./keys.js');
var shuffle = require('shuffle-array')

var secrets, newDM, nextDM, yentaID

newDM = 'ayyyyyyyy lmao'

secrets = [

    "AAA",
    "BBB",
    "CCC",
    "111",
    "222",
    "333"

]

console.log(secrets);

shuffle(secrets);

console.log(secrets);

nextDM = secrets.pop();

console.log(nextDM);

console.log(secrets);

secrets.push(newDM);

console.log(secrets);