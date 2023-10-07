import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editedExpense, setEditedExpense] = useState(null);

  const addExpense = (expense) => {
    setExpenses((prevState) => [expense, ...prevState]);
  };


  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  };

  const editExpense = (editedExpenseData) => {
    // Find the index of the edited expense in the expenses array
    const editedExpenseIndex = expenses.findIndex(
      (expense) => expense.id === editedExpenseData.id
    );

    // Create a copy of the expenses array with the edited expense replaced
    const updatedExpenses = [...expenses];
    updatedExpenses[editedExpenseIndex] = editedExpenseData;

    // Update the expenses state and reset the edited expense state
    setExpenses(updatedExpenses);
    setEditedExpense(null);
  };

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm addExpense={addExpense} editExpense={editExpense}
          editedExpense={editedExpense} />
        <div className="expenseContainer">
          <ExpenseInfo expenses={expenses} />
          <ExpenseList expenses={expenses} deleteExpense={deleteExpense}
            setEditedExpense={setEditedExpense} />
        </div>
      </div>
    </>
  );
}

export default App;
