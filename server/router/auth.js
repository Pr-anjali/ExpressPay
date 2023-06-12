const jwt = require('jsonwebtoken');
const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');

require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
  res.send(`Hello world from the server router js`);
});

// ...existing code...

// Deduct amount from user's account
router.post('/deductAmount', authenticate, async (req, res) => {
  try {
    const { amount, pin } = req.body;
    const user = req.rootUser;

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Verify PIN
    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid PIN' });
    }

    if (user.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    user.balance -= amount;
    await user.save();

    res.status(200).json({ message: 'Amount deducted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add amount to receiver's account
router.post('/addAmount', authenticate, async (req, res) => {
  try {
    const { receiverAccountNumber, amount } = req.body;
    const sender = req.rootUser;

    if (!sender) {
      return res.status(400).json({ error: 'User not found' });
    }

    const receiver = await User.findOne({ accountno: receiverAccountNumber });

    if (!receiver) {
      return res.status(400).json({ error: 'Receiver not found' });
    }

    // Update sender's balance
    if (sender.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }
    sender.balance -= amount;

    // Update receiver's balance
    receiver.balance += amount;

    await Promise.all([sender.save(), receiver.save()]);

    res.status(200).json({ message: 'Amount added successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ...remaining code...

// using promises  

router.post('/register', (req, res) => {

    const { name, email, phone, work, password, cpassword,accountno,pin,balance} = req.body;
    
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Plz filled the field properly" });
    }

    User.findOne({ email: email })
        .then((userExist) => {
            if (userExist) {
                return res.status(422).json({ error: "Email already Exist" });
            }
            
            const user = new User({ name, email, phone, work, password, cpassword,accountno,pin,balance });

            user.save().then(() => {
                res.status(201).json({ message: "user registered successfuly" });
            }).catch((err) => res.status(500).json({ error: "Failed to registered" }));
            
        }).catch(err => { console.log(err); });

});

// Async-Await 

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword, accountno ,pin ,balance } = req.body;
    
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Plz filled the field properly" });
    }

    try {

        const userExist = await User.findOne({ email: email });

        if (userExist) {
             return res.status(422).json({ error: "Email already Exist" });
        } else if (password != cpassword) {
             return res.status(422).json({ error: "password are not matching" });
        } else {
             const user = new User({ name, email, phone, work, password, cpassword ,accountno,pin,balance});
            // yeha pe 
            await user.save();
            res.status(201).json({ message: "user registered successfuly" });
        }
        
  
    } catch (err) {
        console.log(err);
    }

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
