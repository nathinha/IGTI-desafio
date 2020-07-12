const express = require('express');
const TransactionModel = require('../models/TransactionModel');
const transactionRouter = express.Router();

const periodFormat = /^\d{4}[-](0?[1-9]|1[012])$/;

// get all periods in asc order
transactionRouter.get('/periods', async (_, res) => {
  try {
    const periods = await TransactionModel.aggregate(
      [{
        $group: {
          _id: "$yearMonth"
        }
      }, {
        $sort: {
          _id: 1
        }
      }]
    );
    res.send(periods);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// get all transactions of given 'period'
transactionRouter.get('/', async (req, res) => {
  try {
    const period = req.query.period;
    if (period === undefined) {
      res.status(400).send({ error: `Please inform the value on the 'period' query. Format: 'yyyy-mm'` });
    }

    if (!period.match(periodFormat)) {
      res.status(400).send({ error: `Please inform the 'period' in the correct format: 'yyyy-mm'` });
    }

    const transactions = await TransactionModel.find({ yearMonth: period }).exec();
    res.send(transactions);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// get transaction by id
transactionRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await TransactionModel.findById(id);

    if (transaction === null) {
      res.status(404).send({ error: "Transaction not found." })
    } else {
      res.send(transaction);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// update transaction by id
transactionRouter.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const transaction = await TransactionModel.findByIdAndUpdate(
      id,
      {
        $set: data
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (transaction === null) {
      res.status(404).send({ error: "Transaction not found." })
    } else {
      res.send(transaction);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// delete transaction by id
transactionRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await TransactionModel.findByIdAndDelete(id);

    if (transaction === null) {
      res.status(404).send({ error: "Transaction not found." })
    } else {
      res.send(transaction);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// create new transaction
transactionRouter.put('/', async (req, res) => {
  const data = req.body;

  try {
    const transaction = new TransactionModel(data);
    await transaction.save();
    res.send(transaction);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = transactionRouter;
