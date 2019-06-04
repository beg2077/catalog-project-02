const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const catalogMain = new Schema({
    title: {
      type: String,
			unique: true,
			required: true
    },
	  id: {
      type: Number,
			unique: true,
			required: true
		}
  });

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('catalogMain', catalogMain);
