import { useState } from 'react';
import './WalletTab.css';

export default function WalletTab({ code }) {

    const [monthlyBudget, setMonthlyBudget] = useState('');
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('');
    const [paidBy, setPaidBy] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [shoppingItem, setShoppingItem] = useState('');
    const [shoppingItems, setShoppingItems] = useState([]);

    const totalSpent = expenses.reduce((total, expense) => {
        return total + expense.amount;
    }, 0);

    const purchasedItems = shoppingItems.filter((item) => item.purchased).length;

    const remainingItems = shoppingItems.filter((item) => !item.purchased).length;

    function addExpense() {
        if (!expenseName || !expenseAmount || !expenseCategory || !paidBy || !expenseDate) {
            alert('Please complete all expense fields.');
            return;
        }

        if (Number(expenseAmount) <= 0) {
            alert('Expense amount must be greater than zero.');
            return;
        }
        const newExpense = {
            id: crypto.randomUUID(),
            name: expenseName,
            amount: Number(expenseAmount),
            category: expenseCategory,
            paidBy: paidBy,
            date: expenseDate
        };

        setExpenses((previousExpenses) => [
            ...previousExpenses,
            newExpense
        ]);

        setExpenseName('');
        setExpenseAmount('');
        setExpenseCategory('');
        setPaidBy('');
        setExpenseDate('');
    }

    function deleteExpense(id) {
        setExpenses((previousExpenses) =>
            previousExpenses.filter((expense) => expense.id !== id)
        );
    }

    function addShoppingItem() {

        if (!shoppingItem.trim()) {
            alert('Please enter a shopping item.');
            return;
        }

        setShoppingItems((previousItems) => [
            ...previousItems,
            {
                id: crypto.randomUUID(),
                name: shoppingItem,
                purchased: false
            }
        ]);
        setShoppingItem('');
    }


    function toggleShoppingItem(id) {
        setShoppingItems((previousItems) =>
            previousItems.map((item) =>
                item.id === id
                    ? { ...item, purchased: !item.purchased }
                    : item
            )
        );
    }

    function deleteShoppingItem(id) {
        setShoppingItems((previousItems) =>
            previousItems.filter((item) => item.id !== id)
        );
    }

    const remainingBudget = monthlyBudget === ''
        ? 0
        : Number(monthlyBudget) - totalSpent;
    return (
        <section className="wallet-tab">

            <div className="budget-overview">
                <h2>Group Budget</h2>

                <div className="set-budget-area">
                    <label htmlFor="monthlyBudget">Set monthly budget (£)</label>

                    <input
                        id="monthlyBudget"
                        type="number"
                        min="0"
                        placeholder="Enter budget"
                        value={monthlyBudget}
                        onChange={(e) => setMonthlyBudget(e.target.value)}
                        onBlur={() => {
                            if (Number(monthlyBudget) < 0) {
                                setMonthlyBudget('0');
                            }
                        }}
                    />
                </div>

                <div className="budget-cards">
                    <div className="budget-card">
                        <h3>Monthly Budget</h3>
                        <p>£{monthlyBudget}</p>
                    </div>

                    <div className="budget-card">
                        <h3>Total Spent</h3>
                        <p>£{totalSpent}</p>
                    </div>

                    <div className="budget-card">
                        <h3>Remaining</h3>
                        <p style={{ color: remainingBudget < 0 ? '#ef4444' : '#10b981' }}>
                            £{remainingBudget}
                        </p>
                    </div>
                </div>
            </div>
            <div className="add-expense-area">
                <h2>Add Expense</h2>


                <div className="expense-input">
                    <label htmlFor="expenseName">Expense Name</label>
                    <input
                        id="expenseName"
                        type="text"
                        placeholder="e.g. Weekly groceries"
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                    />
                </div>

                <div className="expense-input">
                    <label htmlFor="expenseAmount">Amount (£)</label>
                    <input
                        id="expenseAmount"
                        type="number"
                        min="0"
                        placeholder="Enter amount"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                    />
                </div>

                <div className="expense-input">
                    <label htmlFor="expenseCategory">Category</label>

                    <select
                        id="expenseCategory"
                        value={expenseCategory}
                        onChange={(e) => setExpenseCategory(e.target.value)}
                    >
                        <option value="">Select category</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Accommodation">Accommodation</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="expense-input">
                    <label htmlFor="paidBy">Paid By</label>
                    <input
                        id="paidBy"
                        type="text"
                        placeholder="Member name"
                        value={paidBy}
                        onChange={(e) => setPaidBy(e.target.value)}
                    />
                </div>

                <div className="expense-input">
                    <label htmlFor="expenseDate">Date</label>
                    <input
                        id="expenseDate"
                        type="date"
                        value={expenseDate}
                        onChange={(e) => setExpenseDate(e.target.value)}
                    />
                </div>

                <button
                    type="button"
                    className="add-expense-btn"
                    onClick={addExpense}
                >
                    Add Expense
                </button>

            </div>

            <div className="recent-expenses">
                <h2>Recent Expenses</h2>

                {expenses.length === 0 ? (
                    <p>No expenses recorded yet.</p>
                ) : (
                    <div className="expenses-list">

                        {expenses.map((expense) => (
                            <div className="expense-card" key={expense.id}>
                                <h3>{expense.name}</h3>
                                <p>Amount: £{expense.amount}</p>
                                <p>Category: {expense.category}</p>
                                <p>Paid by: {expense.paidBy}</p>
                                <p>Date: {expense.date}</p>

                                <button
                                    type="button"
                                    onClick={() => deleteExpense(expense.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}

                    </div>
                )}
            </div>

            <div className="shopping-list">
                <h2>Group Shopping List</h2>


                <div className="shopping-progress">
                    <p>Total Items: {shoppingItems.length}</p>
                    <p>Purchased: {purchasedItems}</p>
                    <p>Remaining: {remainingItems}</p>
                </div>

                <div className="shopping-input">
                    <label htmlFor="shoppingItem">Shopping Item</label>

                    <input
                        id="shoppingItem"
                        type="text"
                        placeholder="e.g. Milk, Bread, Eggs"
                        value={shoppingItem}
                        onChange={(e) => setShoppingItem(e.target.value)}
                    />

                    <button type="button" onClick={addShoppingItem}>
                        Add to List
                    </button>


                </div>

                {shoppingItems.length === 0 ? (
                    <p>No items on your shopping list yet.</p>
                ) : (
                    <ul className="shopping-items">
                        {shoppingItems.map((item) => (
                            <li
                                key={item.id}
                                onClick={() => toggleShoppingItem(item.id)}
                                style={{
                                    textDecoration: item.purchased ? 'line-through' : 'none',
                                    opacity: item.purchased ? 0.5 : 1
                                }}
                            >
                                {item.name}


                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteShoppingItem(item.id);
                                    }}
                                >
                                    Delete
                                </button>

                            </li>
                        ))}
                    </ul>
                )}

            </div>

        </section >
    );
}