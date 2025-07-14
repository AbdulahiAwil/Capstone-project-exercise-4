import mongoose from "mongoose";
import Transaction from "../model/Transection.js"

// Create Transactions

export const createTransaction = async (req, res, next) =>{
    try {

        const transaction = await Transaction.create({...req.body, createdBy: req.user._id});
        res.status(201).json(transaction)
        
    } catch (err) {
        next(err)
    }
}

export const getMyTransactions = async (req, res, next) =>{
    try {
        const task = await Transaction.find({createdBy: req.user._id}).sort({createdAt: -1});
        res.status(201).json(task)
    } catch (err) {
        next(err)
    }
}


export const getMonthlySummary = async (req, res, next) => {
  try {
    const userId = req.user._id; // Assumes JWT or auth middleware sets req.user

    const summary = await Transaction.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
            }
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          month: {
            $dateToString: {
              format: "%Y-%m",
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                  day: 1
                }
              }
            }
          },
          totalIncome: 1,
          totalExpense: 1
        }
      },
      { $sort: { month: 1 } }
    ]);

    res.status(200).json({ success: true, data: summary });
  } catch (err) {
    next(err)
  }
}

export const updateTransaction = async (req, res, next) =>{
    try {
        const task = await Transaction.findOneAndUpdate(
            {_id: req.params.id, createdBy: req.user._id},
            req.body,
            {new: true}
        )
        if(!task) return res.status(400).json({message: "Tasks Not Found"});
        res.json(task)
    } catch (err) {
        next(err)
    }
}

export const deleteTransaction = async (req, res, next) => {
  try {
    const tran = await Transaction.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });
    if (!tran) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    next(err);
  }
};

export const listCategories = async (req, res, next)=>{
  try {
    const categories = await Transaction.distinct('category')
    res.status(200).json(categories)
    
  } catch (err) {
    next(err)
  }
}