const jwt = require('jsonwebtoken');
const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');

require('../db/conn');
const User = require('../model/userSchema');
const Transaction = require('../model/transactionSchema');

router.get('/', (req, res) => {
  res.send(`Hello world from the server router js`);
});

// ...

// Save account number and pin
router.post('/save-account-info', authenticate, async (req, res) => {
  try {
    const { accountNo, pin } = req.body;
    const user = req.rootUser;
     
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
     
    // Update user's account number and pin
    user.accountno = accountNo;
    user.pin = pin;
    console.log(user.pin);
    console.log(pin);
    await user.save();

    res.status(200).json({ message: 'Account number and pin saved successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ...

router.post('/transaction', authenticate, async (req, res) => {
  try {
    const { accountno, pin, amount, receiverAccountNumber } = req.body;
    const sender = req.rootUser;
   console.log(sender)
    if (!sender) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Verify PIN
    const isMatch = await bcrypt.compare(pin.toString(), sender.pin.toString());
    console.log(isMatch);
    console.log(pin.toString())
    console.log(sender.pin.toString())
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid PIN' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    const receiver = await User.findOne({ accountno: receiverAccountNumber });

    if (!receiver) {
      return res.status(400).json({ error: 'Receiver not found' });
    }

    // Deduct amount from sender's account
    sender.balance -= amount;

    // Add amount to receiver's account
    receiver.balance += amount;

    await Promise.all([sender.save(), receiver.save()]);

    // Save transaction details
    const transaction = new Transaction({
      senderName: sender.name,
      receiverName: receiver.name,
      senderAcountno: sender.accountno,
      receiverAcountno: receiver.accountno,
      amountTransferred: amount
    });
    await transaction.save();

    res.status(200).json({ message: 'Transaction completed successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Update user's PIN
router.put('/updatePin', authenticate, async (req, res) => {
  try {
    const { pin } = req.body;
    const user = req.rootUser;

    // Update user's PIN
    user.pin = pin;
    await user.save();

    res.status(200).json({ message: 'PIN updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user's Account Number
router.put('/updateAccountno', authenticate, async (req, res) => {
  try {
    const { accountno } = req.body;
    const user = req.rootUser;

    // Update user's Account Number
    user.accountno = accountno;
    await user.save();

    res.status(200).json({ message: 'Account Number updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});





// API to find transactions for a user
router.get('/findTransaction', authenticate, async (req, res) => {
  try {
    const accountno = req.rootUser.accountno;

    // Check if accountno is 0
    if (accountno === 0) {
      return res.status(400).json({ error: 'Please provide your account Number on the profile page' });
    }

    // Find transactions where senderAccountno or receiverAccountno matches the user's accountno
    const transactions = await Transaction.find({
      $or: [
        { senderAccountno: accountno },
        { receiverAccountno: accountno }
      ]
    });

    res.status(200).json(transactions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});





// using promises  

router.post('/register', (req, res) => {

    const { name, email, phone, password, cpassword} = req.body;
    
    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ error: "Plz filled the field properly" });
    }

    User.findOne({ email: email })
        .then((userExist) => {
            if (userExist) {
                return res.status(422).json({ error: "Email already Exists" });
            }
            
            const user = new User({ name, email, phone, password, cpassword });

            user.save().then(() => {
                res.status(201).json({ message: "user registered successfuly" });
            }).catch((err) => {console.log(err); return res.status(500).json({ error: "error" })});
            
        }).catch(err => { console.log(err); });


});

// login route 

router.post('/signin', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({error:"Plz Filled the data"})
        }

        const userLogin = await User.findOne({ email: email });

        // console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

           

        if (!isMatch) {
            res.status(400).json({ error: "Invalid Credientials " });
        } else {
             // need to genereate the token and stored cookie after the password match 
            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),  //one month
                httpOnly:true
            });
            
            res.json({ message: "user Signin Successfully" });
        }
        } else {
             res.status(400).json({ error: "Invalid Credientials " });
        }

    } catch (err) {
        console.log(err);
    }
});


// about us page 

router.get('/about', authenticate ,(req, res) => {
    console.log(`Hello my About`);
    res.send(req.rootUser);
});

// get user data for contact us and home page 
router.get('/getdata', authenticate, (req, res) => {
    console.log(`Hello my About`);
    res.send(req.rootUser);
});



// contact us page 

router.post('/contact', authenticate, async (req, res) => {
    try {

        const { name, email, phone, message } = req.body;
        
        if (!name || !email || !phone || !message) {
            console.log("error in contact form");
            return res.json({ error: "plzz filled the contact form " });
        }

        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {
            
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();

            res.status(201).json({ message: "user Contact successfully" });

        }
        
    } catch (error) {
        console.log(error);
    }

});

// Logout  page 

router.get('/logout', (req, res) => {
    console.log(`Hello my Logout Page`);
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User logout');
});


module.exports = router;
