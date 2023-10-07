import React, { useEffect, useRef } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = ({ addExpense, editExpense, editedExpense }) => {
  const expenseTextInput = useRef();
  const expenseAmountInput = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const expenseText = expenseTextInput.current.value;
    const expenseAmount = expenseAmountInput.current.value;
    if (parseInt(expenseAmount) === 0) {
      return;
    }

    const expense = {
      text: expenseText,
      amount: expenseAmount,
      id: editedExpense ? editedExpense.id : new Date().getTime()
    };
    if (editedExpense) {
      // Edit an existing expense
      editExpense(expense);
    } else {
      // Add a new expense
      addExpense(expense);
    }
    clearInput();
    return;
  };

  const clearInput = () => {
    expenseAmountInput.current.value = "";
    expenseTextInput.current.value = "";
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h3>{editedExpense ? "Edit Transaction" : "Add new transaction"}</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        ref={expenseTextInput}
        required
        defaultValue={editedExpense ? editedExpense.text : ""}
      />
      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense,positive-income)</div>
      </div>
      <input
        className={styles.input}
        id="expenseAmount"
        type="number"
        placeholder="Enter amount..."
        ref={expenseAmountInput}
        required
        defaultValue={editedExpense ? editedExpense.amount : ""}
      />
      <button className={styles.submitBtn}>{editedExpense ? "Update Transaction" : "Add Transaction"}</button>
    </form>
  );
};

export default ExpenseForm;
