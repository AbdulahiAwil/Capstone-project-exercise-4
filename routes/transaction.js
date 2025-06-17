import express from 'express'
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validateZode.js';

import {
  createTransaction,
  deleteTransaction,
  getMonthlySummary,
  getMyTransactions,
  updateTransaction
} from '../controller/transaction.js';

import { transactionsValidationSchema } from '../schemas/transactionSchemas.js';

const router = express.Router();

/**
 * @swagger
 * /transaction:
 *   get:
 *     summary: Get all transactions for the logged-in user
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of transactions
 */
router.get('/', protect, getMyTransactions);

/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - type
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [expense, income]
 *               category:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Transaction created
 */
router.post('/', protect, validate(transactionsValidationSchema), createTransaction);

/**
 * @swagger
 * /transaction/summary:
 *   get:
 *     summary: Get monthly transaction summary for the logged-in user
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly summary returned
 */
router.get('/summary', protect, getMonthlySummary);

/**
 * @swagger
 * /transaction/{id}:
 *   put:
 *     summary: Update a transaction
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [expense, income]
 *               category:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Transaction updated
 *       404:
 *         description: Transaction not found
 */
router.put('/:id', protect, updateTransaction);

/**
 * @swagger
 * /transaction/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted
 *       404:
 *         description: Transaction not found
 */
router.delete('/:id', protect, deleteTransaction);

export default router;
