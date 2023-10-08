import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [check, setCheck] = useState(false);
  const [editedExpense, setEditedExpense] = useState({});

  const addExpense = (expense) => {
    setExpenses((prevState) => [expense, ...prevState]);
  };


  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  };

  const editExpense = (expense) => {
    // Find the index of the edited expense in the expenses array
    const indexToEdit = expenses.findIndex((ex) => ex.id === expense.id);


    // Make a copy of the expenses array
    const updatedExpenses = [...expenses];

    // Update the copy of the expenses array with the edited expense
    updatedExpenses[indexToEdit] = expense;
    // console.log(updatedExpenses);

    // Set the state with the updated expenses array
    setExpenses(updatedExpenses);

    setEditedExpense({});
    setCheck(false);
  };
  const edit = (id) => {
    const x = expenses.filter((expense) => expense.id === id);
    setEditedExpense(x[0]);
    setCheck(true);
  }

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm addExpense={addExpense}
          editedExpense={editedExpense} check={check} editExpense={editExpense} />
        <div className="expenseContainer">
          <ExpenseInfo expenses={expenses} />
          <ExpenseList expenses={expenses} deleteExpense={deleteExpense}
            edit={edit} />
        </div>
      </div>
    </>
  );
}

export default App;
