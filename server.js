const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors());



const fetchTransactions = async () => {
 try {
 const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
 transactions = response.data; // Store the data in the transactions variable
 } catch (error) {
 console.error('Error fetching transactions:', error);
 }
};
fetchTransactions();


app.get('/api/transactions', (req, res) => {

res.json(transactions);

});



app.get('/', (req, res) => {
 res.send("Hi, I am live");
});



const start = async () => {
 try {
 app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
 });
} catch (error) {
 console.log(error);
 }

};
start();