const express = require('express');
const TransactionModel = require('../models/TransactionModel');
const transactionRouter = express.Router();
const logger = require('../utils/logger');

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
    logger.info(`GET /periods successfully executed`);
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
      logger.error(`GET /?period=${period}: Please inform the value on the 'period' query. Format: 'yyyy-mm'`);
      res.status(400).send({ error: `Please inform the value on the 'period' query. Format: 'yyyy-mm'` });
    }

    if (!period.match(periodFormat)) {
      logger.error(`GET /?period=${period}: Please inform the 'period' in the correct format: 'yyyy-mm'`);
      res.status(400).send({ error: `Please inform the 'period' in the correct format: 'yyyy-mm'` });
    }

    const transactions = await TransactionModel.find({ yearMonth: period }).exec();
    logger.info(`GET /?period=${period} successfully executed`);
    res.send(transactions);
  } catch (error) {
    logger.error(`GET /?period=${period}: ${error.message}`);
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
      logger.error(`PATCH /${id}: Transaction not found.`);
      res.status(404).send({ error: "Transaction not found." })
    } else {
      logger.info(`PATCH /${id} successfully executed`);
      res.send(transaction);
    }
  } catch (error) {
    logger.error(`PATCH /${id}: ${error.message}`);
    res.status(500).send({ error: error.message });
  }
});

// delete transaction by id
transactionRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await TransactionModel.findByIdAndDelete(id);

    if (transaction === null) {
      logger.error(`DELETE /${id}: Transaction not found.`);
      res.status(404).send({ error: "Transaction not found." })
    } else {
      logger.info(`DELETE /${id} successfully executed`);
      res.send(transaction);
    }
  } catch (error) {
    logger.error(`DELETE /${id}: ${error.message}`);
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
