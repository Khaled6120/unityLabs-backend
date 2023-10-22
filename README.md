# E-commerce Marketplace REST API ✅

##  ➡️ Overview

This project provides a REST API for an e-commerce marketplace. It offers a set of endpoints that enable various functionalities for both buyers and sellers. Here's what this project can do:

- Buyers and sellers can register and log in to the system.
- Sellers can build a catalog of items, each with a name and price.
- Buyers can retrieve a list of sellers.
- Buyers can view a specific seller's catalog (list of items).
- Buyers can create an order that contains a list of items from the seller's catalog.
- Sellers can retrieve a list of all orders they've received.

## ➡️ Instructions

To run this project on your local machine, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Khaled6120/unityLabs-backend-assignment.git
   cd unityLabs-backend-assignment
   npm install

2. Create a `.env file` in the project root and define the following variables:

- `PORT:` The port number to run the server on. <br />
- `MONGODB_URI:` The URI for your MongoDB database. <br />
- `JWT_SECRET:` Your preferred secret key for JSON Web Tokens. <br />

Here's an example `.env file`:

   ```bash
   PORT=8080
   MONGODB_URI=mongodb+srv://<YOUR_USERNAME>:<YOUR_PASSWORD>@cluster0.0jaai0f.mongodb.net/?retryWrites=true&w=majority
   JWT_SECRET=YOUR_PREFERRED_SECRET_KEY


```
3. Start the server using the following command: 
`npm run start`

Your e-commerce marketplace REST API should now be running on your local machine.

## ➡️ Used Technologies
This project was built using the following technologies:

- Express
- Node.js
- MongoDB
- Mongoose
- Bcrypt
- JSON Web Tokens
- Nodemon
- Body-parser
- HTTP Status Codes
- Express Async Handler
- Dotenv

These technologies and packages were used to create a robust and secure REST API for the e-commerce marketplace.

