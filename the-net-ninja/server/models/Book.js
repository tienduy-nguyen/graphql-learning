const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    name: String,
    genre: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'author',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('book', BookSchema);
