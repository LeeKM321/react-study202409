import React from 'react';
import './App.css';
import ExpenseItem from './components/Expense/ExpenseItem';
import Expenses from './components/Expense/Expenses';
import NoName from './NoName';
import NewExpense from './components/NewExpense/NewExpense';

function App() {
  const expenses = [
    { id: 1, title: '냠냠치킨', price: 19000, date: new Date(2023, 6, 19) },
    { id: 2, title: '양파', price: 5000, date: new Date(2023, 6, 20) },
  ];

  return (
    <>
      <NewExpense />
      <Expenses expenses={expenses} />
    </>
  );
}

export default App;
