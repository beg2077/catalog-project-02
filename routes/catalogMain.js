var express = require('express');
var router = express.Router();
var async = require('async');

const mongoose = require('mongoose');
const catalogMain = mongoose.model('catalogMain');

// запись данных в бд в коллекцию catalogMains
router.post('/', function(req, res, next) {                // Вывод шаблона представления.

	const newCatalogMain = new catalogMain();
	newCatalogMain.title = req.body.title_name;
	newCatalogMain.id = req.body.title_id;

	newCatalogMain.save(function(err, newCatalogMain) {
			if (err) {
				res.status(500);

				console.error(err);
/*
				console.log('ERROR save: newCatalogMain');
				console.log(err);
*/
				// req.flash('message', err.message);
				res.json(err.message);

				// return next(err);
			}
			req.flash('message', 'Done writing create');
			// console.log('Done writing catalog!!!');
/*
			console.log('POST: newCatalogMain SEND!');
			console.log(newCatalogMain);
*/
			res.status(200).json(newCatalogMain);		// Рабочая версия!!!! Попадает куда надо
/*
			res.end()
			res.status(404).end()
			Используйте для быстрого завершения ответа без каких-либо данных.
			Если вам нужно ответить данными, вместо этого используйте такие методы,
			как res.send () и res.json () .
*/
			// return res.redirect('/catalogMain');  // Рабочая версия!!!! 		// Перенаправление ответа.
	});
});

// вывод данных из коллекции catalogMains
router.get('/', function(req, res, next) { // Вывод шаблона представления.

	var listCatalogMains;

	catalogMain.find({}, function (err, users) {	// выбрать ВСЕ! это работает
		if (err) return next(err);

		const title = 'Список упражнений из коллекции catalogMains';
		// const message = 'test';

		listCatalogMains = users;
		res.render('catalogMain', {catalogs: listCatalogMains, title}); 	//, message});
		// res.render('catalogMain', {catalogs: listCatalogMains, title: 'Список упражнений из PPPPP'});

	});
});

module.exports = router;
