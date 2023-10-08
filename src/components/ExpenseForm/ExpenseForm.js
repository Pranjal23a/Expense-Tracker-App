import React, { useState, useEffect, useRef } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = ({ addExpense, editedExpense, check, editExpense }) => {
  const expenseTextInput = useRef();
  const expenseAmountInput = useRef();

  const [expenseText, setExpenseText] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  useEffect(() => {
    if (check) {
      // When editing, set the text and amount from the editedExpense
      setExpenseText(editedExpense.text || "");
      setExpenseAmount(editedExpense.amount || "");
    } else {
      // When adding a new expense, clear the inputs
      setExpenseText("");
      setExpenseAmount(0);

    }
  }, [editedExpense, check]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (parseInt(expenseAmount) === 0) {
      return;
    }

    const expense = {
      text: expenseText,
      amount: expenseAmount,
      id: check ? editedExpense.id : new Date().getTime()
    };
    if (check) {
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
    setExpenseText("");
    setExpenseAmount("");
    expenseAmountInput.current.value = "";
    expenseTextInput.current.value = "";
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h3>{check ? "Edit Transaction" : "Add new transaction"}</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        ref={expenseTextInput}
        required
        value={expenseText} // Use value to set the input value
        onChange={(e) => setExpenseText(e.target.value)}
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
        value={expenseAmount} // Use value to set the input value
        onChange={(e) => setExpenseAmount(e.target.value)}
      />
      <button className={styles.submitBtn}>{check ? "Edit Transaction" : "Add Transaction"}</button>
    </form>
  );
};

export default ExpenseForm;
