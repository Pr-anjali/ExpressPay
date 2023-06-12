import React from 'react';
import '../styles/Transactionhistory.css';

const Transactionhistory = () => {
  // Dummy data for demonstration
  const transactions = [
    {
      senderName: 'John Doe',
      senderAccountNumber: '123456789',
      receiverName: 'Jane Smith',
      receiverAccountNumber: '987654321',
      date: '2023-06-12',
      amount: 100.0,
    },
    // Add more transactions as needed
  ];

  return (
    <div className="transaction-page">
      <h1>Transaction History</h1>
      {transactions.map((transaction, index) => (
        <div key={index} className="transaction-card">
          <div className="transaction-info">
            <div className="info-item123">
              <span className="info-label123">Sender:</span>
              <span className="info-value123">{transaction.senderName}</span>
              <span className="info-label123">Account Number:</span>
              <span className="info-value123">{transaction.senderAccountNumber}</span>
            </div>
            <div className="info-item123">
              <span className="info-label123">Receiver:</span>
              <span className="info-value123">{transaction.receiverName}</span>
              <span className="info-label123">Account Number:</span>
              <span className="info-value123">{transaction.receiverAccountNumber}</span>
            </div>
            <div className="info-item123">
              <span className="info-label123">Date:</span>
              <span className="info-value123">{transaction.date}</span>
              <span className="info-label123">Amount:</span>
              <span className="info-value123">{transaction.amount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Transactionhistory;
