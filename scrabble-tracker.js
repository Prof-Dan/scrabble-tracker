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

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
