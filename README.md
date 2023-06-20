
# README - ExpressPay Digital Wallet System with e-RUPI Integration
This README provides instructions on setting up and running the ExpressPay digital wallet system with e-RUPI integration. The system allows users to store, send, and receive digital currencies or digital assets, and facilitates seamless transactions using e-RUPI.
# System Requirements:
•	Node.js (v14 or above) <br />
•	MongoDB<br />
•	e-RUPI Payment Gateway API credentials
# Setup Instructions:
# 1.	Clone the Repository:
git init <br />
git clone <repository_url>

# 2.	Install Dependencies:
npm install <br />

# 3.	Split the terminal. On one terminal change directory to server and run the server:
cd server <br />
nodemon app.js

# 4. If the dotenv file is not installed on the server side, run the command:
npm install dotenv --save

# 5.	On the other terminal change directory to client and run the client:
cd client <br />
npm start

# 6. If you encounter any problems on client side of terminal, run the command :
npm audit fix --force

# 7. It is recommended to install packages, if shown as error in the terminal by running the command :
npm install <package_name> 
or 
npm install <package_name> --force

# 7.	User Registration:
•	Click on the "Sign Up" button on the homepage to create a new user account. <br />
•	Fill in the required details and submit the form. <br />
•	Upon successful registration, you will be redirected to the home page.

# 8.	User Login:
•	Use the registered credentials to log in to the system. <br />
•	After successful login, you will be redirected to the home page.

# 9.	Now you are ready to explore our website.

With the ExpressPay digital wallet system, users can securely manage their digital assets, add funds, initiate transactions, and view transaction history. The integration with the e-RUPI using the Voucherify api that provides unique QR and Bar-code which can be scanned by user’s unique id enables seamless transactions using e-RUPI vouchers. The system prioritizes user experience, security, and reliability to provide a robust and user-friendly digital wallet solution.
