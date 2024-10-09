import React, { useEffect, useState } from 'react';
import TransactionTable from './components/TransactionTable';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]); // All transactions from API
  const [filteredTransactions, setFilteredTransactions] = useState([]); // Filtered transactions
  const [selectedMonth, setSelectedMonth] = useState('January'); // Selected month
  const [searchTerm, setSearchTerm] = useState(''); // Search term

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/transactions');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  // Filter data whenever selected month or search term changes
  useEffect(() => {
    const filterTransactions = () => {
      const monthIndex = new Date(Date.parse(selectedMonth + " 1, 2024")).getMonth() + 1;
      const filtered = transactions.filter(transaction => {
        const transactionMonth = new Date(transaction.date).getMonth() + 1;
        const matchesMonth = transactionMonth === monthIndex;
        const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesMonth && matchesSearch;
      });
      setFilteredTransactions(filtered);
    };

    filterTransactions();
  }, [selectedMonth, transactions, searchTerm]);

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="logo">Transaction Dashboard</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Search Transaction"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
        <TransactionTable transactions={filteredTransactions} />
      </header>
    </div>
  );
}

export default App;