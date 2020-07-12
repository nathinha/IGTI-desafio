const mongoose = require('mongoose');

const schema = mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true,
    min: [0, `set type to 'despesa' for negative values`]
  },
  day: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  yearMonth: {
    type: String
  },
  yearMonthDay: {
    type: String
  }
}, { toJSON: { virtuals: true } });

const TransactionModel = mongoose.model('transaction', schema);

module.exports = TransactionModel;
