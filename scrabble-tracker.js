var letterValues = {

  a:1,
  b:3,
  c:3,
  d:2,
  e:1,
  f:4,
  g:2,
  h:4,
  i:1,
  j:8,
  k:5,
  l:1,
  m:3,
  n:1,
  o:1,
  p:3,
  q:10,
  r:1,
  s:1,
  t:1,
  u:1,
  v:4,
  w:4,
  x:8,
  y:4,
  z:10

};

scoreCollection = new Mongo.Collection('score');

var name;

if (Meteor.isClient) {

  name = prompt('What is your name?')

  Template.body.helpers({

    users: function() {

      return scoreCollection.find({}, {sort:{score:-1}})

    }

  });

  Template.body.events({

    'submit #scrabbleForm': function() {

      event.preventDefault();

      scoreCollection.update(name, {$inc:{score: getScore()}});

    }

  });

  scoreCollection.insert({_id:name, name:name, score:0});

  // counter starts at 0
  //Session.setDefault('counter', 0);

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });

  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set('counter', Session.get('counter') + 1);
  //   }
  // });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    scoreCollection.remove({});
  });
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getScore() {

  var word = document.getElementById('wordBox').value.toLowerCase();
  var wordScore = 0;
  for(var i=0;i<word.length;i++) {

    wordScore += letterValues[word[i]];

  }

  var doubles = document.getElementById('doubleLetters').value.toLowerCase();
  for(var j=0;j<doubles.length;j++) {

    wordScore += letterValues[doubles[j]];

  }

  var triples = document.getElementById('tripleLetters').value.toLowerCase();
  for(var k=0;k<triples.length;k++) {

    wordScore += (letterValues[triples[j]]*2);

  }

  if(document.getElementById('doubleWord').checked) {

    wordScore *= 2;

  }

  if(document.getElementById('tripleWord').checked) {

    wordScore *= 3;

  }

  return wordScore;

}
