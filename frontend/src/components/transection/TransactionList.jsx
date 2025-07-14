import { ClipboardCheck, Search } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import TransactionTable from './TransactionTable';

function TransactionList({ trans = [], isLoading = false, onEdit, onDelete, ontypeChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransaction = trans.filter(tran => {
    const matchesSearch =
      tran.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tran.category && tran.category.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const getTransStats = () => {
    const allIncome = trans.filter(t => t.type === 'income');
    const allExpense = trans.filter(t => t.type === 'expense');

    const categorizedTrans = {
      all: filteredTransaction,
      income: filteredTransaction.filter(t => t.type === 'income'),
      expense: filteredTransaction.filter(t => t.type === 'expense'),
    };

    const stats = {
      total: trans.length,
      income: allIncome.length,
      expense: allExpense.length,
    };

    return { stats, categorizedTrans };
  };

  const getBalance = (trans) => {
    const income = trans
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = trans
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return (income - expense).toFixed(2);
  };

  const { stats, categorizedTrans } = getTransStats();
  const balance = getBalance(trans);
  const balanceClass = Number(balance) < 0 ? 'text-red-600' : 'text-green-600';

  return (
    <div className="space-y-6">
      {/* Start overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total */}
        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Total</p>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>

        {/* Income */}
        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Income</p>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.income}</p>
        </div>

        {/* Expense */}
        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Expense</p>
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.expense}</p>
        </div>

        {/* Balance */}
        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Balance</p>
            <div className={`h-2 w-2 rounded-full ${Number(balance) < 0 ? 'bg-red-500' : 'bg-green-500'}`} />
          </div>
          <p className={`text-2xl font-bold ${balanceClass}`}>
            ${balance}
          </p>
        </div>
      </div>

      {/* Search input */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground transform -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All
            <Badge variant="secondary">{stats.total}</Badge>
          </TabsTrigger>
          <TabsTrigger value="income" className="flex items-center gap-2">
            Income
            <Badge variant="secondary">{stats.income}</Badge>
          </TabsTrigger>
          <TabsTrigger value="expense" className="flex items-center gap-2">
            Expense
            <Badge variant="secondary">{stats.expense}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <TransactionTable
            transaction={categorizedTrans.all}
            emptyMessage="No transactions found."
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </TabsContent>
        <TabsContent value="income">
          <TransactionTable
            transaction={categorizedTrans.income}
            emptyMessage="No income transactions."
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </TabsContent>
        <TabsContent value="expense">
          <TransactionTable
            transaction={categorizedTrans.expense}
            emptyMessage="No expense transactions."
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TransactionList;
