import React, { useState, useEffect } from 'react';
import '../styles/Erupi.css';

const Erupi = () => {
  const [userData, setUserData] = useState({ name: '', email: '', accountno: '', pin: '' });

  const Erupidata = async () => {
    try {
      const res = await fetch('/getdata', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      console.log(data);
      setUserData({ ...userData, name: data.name, email: data.email, accountno: data.accountno, pin: data.pin , balance: data.balance });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    Erupidata();
}, []);

// we are storing data in states 


  const [amount, setAmount] = useState('');
  const [receiverAccountNumber, setReceiverAccountNumber] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [pin, setPin] = useState('');
  const [showPinPrompt, setShowPinPrompt] = useState(false);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleReceiverAccountNumberChange = (e) => {
    setReceiverAccountNumber(e.target.value);
  };

  const handleReceiverNameChange = (e) => {
    setReceiverName(e.target.value);
  };

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  const handleTransferClick = () => {
    setShowPinPrompt(true);
  };

  const handleTransaction = async (e) => {
    e.preventDefault();
  
    const { name, accountno, pin, balance } = userData;
  
    try {
      // Make an API call to deduct the amount from the user's account
      const userRes = await fetch('/deductAmount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountno,
          pin,
          amount,
        }),
      });
  
      if (userRes.status === 200) {
        // Deduction from user's account was successful, now add the amount to the receiver's account
        const receiverRes = await fetch('/addAmount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            receiverAccountNumber,
            amount,
          }),
        });
  
        if (receiverRes.status === 200) {
          // Update the user's balance in the state
          const updatedBalance = balance - amount;
          setUserData({ ...userData, balance: updatedBalance });
  
          // Reset the form fields after the transaction
          setAmount('');
          setReceiverAccountNumber('');
          setReceiverName('');
          setPin('');
          setShowPinPrompt(false);
  
          // Show the success alert
          const alertMessage = 'Thanks for payment through ERupi';
          const alertElement = document.createElement('div');
          alertElement.className = 'alert success';
          alertElement.appendChild(document.createTextNode(alertMessage));
          document.body.appendChild(alertElement);
  
          // Remove the alert after a certain time
          setTimeout(() => {
            document.body.removeChild(alertElement);
          }, 3000);
        } else {
          // Error occurred while adding amount to the receiver's account
          throw new Error('Failed to add amount to receiver\'s account');
        }
      } else {
        // Error occurred while deducting amount from the user's account
        throw new Error('Failed to deduct amount from user\'s account');
      }
    } catch (error) {
      // Show the error alert
      const alertMessage = `Error: ${error.message}`;
      const alertElement = document.createElement('div');
      alertElement.className = 'alert error';
      alertElement.appendChild(document.createTextNode(alertMessage));
      document.body.appendChild(alertElement);
  
      // Remove the alert after a certain time
      setTimeout(() => {
        document.body.removeChild(alertElement);
      }, 3000);
    }
  };
  
  



  

  return (
    <div className="transaction-form-container">
      <h2>User Information</h2>
      <p>Name : {userData.name}</p>
      <p>Email : {userData.email}</p>
      <p>Account Number : {userData.accountno}</p>
      <p>Balance : {userData.balance}</p>

      <h2>Transaction Details</h2>
      <form>
        <div className="text-center">Amount:</div>
        <input type="number" value={amount} onChange={handleAmountChange} required />
        <br />
        <div className="form-row">
          <div className="text-center">Receiver's Account Number:</div>
          
          <input
            type="text"
            id="receiverAccountNumber"
            value={receiverAccountNumber}
            onChange={handleReceiverAccountNumberChange}
            required
          />
        </div>
        <br />
        <div className="form-row">
          <div className="text-center">Receiver's Name:</div>
          <input
            type="text"
            id="receiverName"
            value={receiverName}
            onChange={handleReceiverNameChange}
            required
          />
        </div>
        <div className="contact_form_button">
        <button type="button"  className="contact_button" onClick={handleTransferClick}>
          Transfer
        </button>
        </div>
        <br/>  <br/> 
        {showPinPrompt && (
          <div className="pin-prompt">
            <div className="text-center">PIN:</div>
            <br/>
            <input type="password" value={pin} onChange={handlePinChange} required />
           
            <div className="contact_form_button">
            <button type="submit" className="contact_button" onSubmit={handleTransaction}>Confirm Transfer</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Erupi;
