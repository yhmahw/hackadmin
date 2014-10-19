var express = require('express');
var unirest = require('unirest');

var router = express.Router();

var baseUrl = "http://api-yhmahw.herokuapp.com";

router.get('/:id', function(req, _res) {
  var name = req.params.id;

  var url = baseUrl + "/hackathon/" + name;

  var data = {
    name: 'Boilermake2014',
    members: [
      {
        userId: 'jjman505',
        email: 'jjman505@gmail.com',
        phone: '8039846454',
        status: 'accepted'
      },
      {
        userId: 'guy23',
        email: 'guy@example.com',
        phone: '4758754755',
        status: 'applied'
      },
      {
        userId: 'dan33',
        email: 'dan@example.com',
        phone: '2942638787',
        status: 'subscribed'
      },
      {
        userId: 'ned99',
        email: 'ned@example.com',
        phone: '4857854545',
        status: 'denied'
      },
      {
        userId: 'dave56',
        email: 'dave@example.com',
        phone: '2533433535',
        status: 'waitlisted'
      }
    ]
  }
  _res.render('hackathons/show', data);
  return;

  unirest.get(url)
  .headers({ 'Content-Type': 'application/json' })
  .send({})
  .end(function (res) {
    var status = res.statusCode;
    var data = res.body;
    if (status == 200) {
      console.log("successfully loaded hackathon: ", data);
      _res.render('hackathons/show', data);
    } else {
      console.log("show hackathon error: ", status, data);
      _res.end();
    }
  });
});

router.get('/:id/raffle', function(req, res) {
  var name = req.params.id;

  res.render('hackathons/raffle', { name: name });
});

router.post('/login', function(req, _res) {
  var token = req.body.access_token;
  console.log("token: ", token);

  var url = baseUrl + "/login";

  unirest.post(url)
  .headers({ 'Content-Type': 'application/json' })
  .send({ 'access_token': token })
  .end(function (res) {
    var status = res.statusCode;
    if (status == 201 || status == 202) {
      var userId = res.body.userId;
      console.log("successfully logged in: ", userId);
      _res.end(userId);
    } else {
      console.log("login error: ", res.statusCode, res.body.message);
      _res.end();
    }
  });
});

router.post('/email', function(req, _res) {
  var hackathon = req.body.hackathon;
  var email = req.body.email;
  console.log("email body: ", req.body);

  var url = baseUrl + "/hackathon/" + hackathon + "/email/" + email;

  unirest.put(url)
  .headers({ 'Content-Type': 'application/json' })
  .send({})
  .end(function (res) {
    var status = res.statusCode;
    if (status == 201) {
      console.log("successfully registered email: ", email);
      _res.end("Signed up.");
    } else if(status == 202) {
      console.log("email already registered: ", email);
      _res.end("Signed up.");
    } else {
      console.log("email error: ", res.statusCode, res.body);
      _res.end("Error. Refresh and try again.");
    }
  });
});

router.post('/phone', function(req, _res) {
  var user = req.body.user;
  var phone = req.body.phone;
  console.log("phone body: ", req.body);

  var url = baseUrl + "/user/" + user + "/phone/" + phone;

  unirest.put(url)
  .headers({ 'Content-Type': 'application/json' })
  .send({})
  .end(function (res) {
    var status = res.statusCode;
    if (status == 200) {
      console.log("successfully registered phone: ", phone);
      _res.end("Signed up.");
    } else {
      console.log("phone error: ", res.statusCode, res.body);
      _res.end("Error. Refresh and try again.");
    }
  });
});

router.post('/text/android', function(req, _res) {
  var phone = req.body.phone;
  console.log("text android body: ", req.body);

  var downloadMessage = 'Download "You Had Me @ Hello World" app here: ' +
                        'gethelloworld.me'

  var url = baseUrl + "/text/" + phone;

  unirest.put(url)
  .headers({ 'Content-Type': 'application/json' })
  .send({ message: downloadMessage })
  .end(function (res) {
    var status = res.statusCode;
    if (status == 200) {
      console.log("successfully registered phone: ", phone);
      _res.end("Signed up.");
    } else {
      console.log("phone error: ", res.statusCode, res.body);
      _res.end("Error. Refresh and try again.");
    }
  });
});

module.exports = router;
