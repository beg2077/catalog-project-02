// app.use('/registration', reg); - модульные, монтируемые обработчики маршрутов
// app.use('/catalogMain', catalogMain);

// require('./models/user');

var express = require('express');
var router = express.Router();
var async = require('async');

const mongoose = require('mongoose');
const catalogMain = mongoose.model('catalogMain');

/* GET home page. */
router.get('/', function(req, res, next) {                // Вывод шаблона представления.

	console.log("catalogMain.js router.get('/' ------------------------------ ");

	// считывание данных из бд объектов catalogMains

	var listCatalogMains;

	catalogMain.find({}, function (err, users) {	// это работает
		if (err) return next(err);

		listCatalogMains = users;
		console.log('listCatalogMains -----------------------');
		console.log(listCatalogMains);							// список объектов

		console.log('listCatalogMains forEach -----------------------');
		listCatalogMains.forEach(function(item, i, arr) {
			console.log('forEach ' + i + ": " + item );
		});

		listCatalogMains.forEach(function(item, i, arr) {
			console.log('forEach ' + i + ": " + item.title );
		});

		res.json(users);
	});

/*	
	catalogMain.find({}).then(catalogmains => { // это промис !!!
		// console.log(catalogmains);
		console.log('catalogmains -----------------------');
		console.log(JSON.stringify(catalogmains, null, 2));
		listCatalogMains = catalogmains;
	});
*/
	// заполнение шаблона данными из объектов
/*
	var catalogs = [
		{title: 'упражнение № 1', id: 1},
		{title: 'упражнение № 2', id: 2},
		{title: 'упражнение № 3', id: 3},
		{title: 'упражнение № 4', id: 4}
	];

	// var vasya = new User({username: 'Вася', password: 'supervasya'});
	async.each(catalogs,
		function(catalogM, callback) {
			console.log('catalogMain.js catalogM ----------');
			console.log(catalogM);

			var catalogMa = new mongoose.models.catalogMain(catalogM);          // var user = new User(userData);
			catalogMa.save(callback);    // callback(err) /  callback(null, user, affected)
		},
		function(err) {
			if (err) {
				console.error(err);
			} else {
				console.log('Done writing catalog!!!');
			}
		}
	);
*/

	res.end;
  // res.render('catalogMain', { message: req.flash('message') });
});

module.exports = router;

