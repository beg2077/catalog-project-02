// app.use('/registration', reg); - модульные, монтируемые обработчики маршрутов

var express = require('express');
var router = express.Router();

const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const bCrypt = require('bcryptjs');     // ('bcrypt-nodejs');

/* GET home page. */
router.get('/', function(req, res, next) {                // Вывод шаблона представления.

	console.log("Reg.js router.GET ------------------------------ ");
	console.log(req.body);
	console.log("Reg.js router.GET ----------------------------- end ");

  res.render('reg', { message: req.flash('message') });
});

router.post('/', function(req, res, next) {
	console.log("reg.js router.POST ------------------------------ ");
	console.log(req.body);
	console.log("reg.js router.POST ----------------------------- end ");

  User.findOne({ login: req.body.username })
    .then(user => {
      if (user) {
        req.flash('message', 'Пользователь с таким логином уже существует');
        res.redirect('/registration');                // Перенаправление ответа.
      } else {
        const newUser = new User();
        newUser.login = req.body.username;
        newUser.password = createHash(req.body.password);
        newUser.email = req.body.email;
        newUser.name = req.body.name;
        newUser
          .save()
          .then(user => {
            req.logIn(user, function(err) {
              if (err) {
                return next(err);
              }
              req.flash('message', 'User create');
              // отправить письмо nodemailer !!!
              return res.redirect('/profile');        // Перенаправление ответа.
            });
          })
          .catch(next);
      }
    })
    .catch(next);
});

var createHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

module.exports = router;
