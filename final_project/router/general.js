const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!doesExist(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
});

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    return res.send(JSON.stringify(books,null,4));  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.send(books[req.params.isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let allbooks = [];
  for(var b in books)
  {
      allbooks.push(books[b])
  }
  return res.send(allbooks.filter(b => b.author == req.params.author));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
   //Write your code here
   let allbooks = [];
   for(var b in books)
   {
       allbooks.push(books[b])
   }
   return res.send(allbooks.filter(b => b.title == req.params.title));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.send(books[req.params.isbn]["reviews"]);
});


// TASK 10 - Get the book list available in the shop using promises
public_users.get('/books',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });

      get_books.then(() => console.log("Promise for Task 10 resolved"));

  });

  // TASK :11
  public_users.get('/books/isbn/:isbn',function (req, res) {
    
    const get_books_by_isbn = new Promise((resolve, reject) => {
        resolve(res.send(books[req.params.isbn]));
      });

      get_books_by_isbn.then(() => console.log("Promise for Task 11 resolved"));

   });
    
  // TASK 12: Get book details based on author
  public_users.get('/books/author/:author',function (req, res) {
    let allbooks = [];
    for(var b in books)
    {
        allbooks.push(books[b])
    }    
    const get_books_by_author = new Promise((resolve, reject) => {
        resolve(res.send(allbooks.filter(b => b.author == req.params.author)));
      });

      get_books_by_author.then(() => console.log("Promise for Task 12 resolved"));

  });
  
  // TASK 13: Get all books based on title
  public_users.get('/books/title/:title',function (req, res) {
     //Write your code here
     let allbooks = [];
     for(var b in books)
     {
         allbooks.push(books[b])
     }
     
     const get_books_by_title = new Promise((resolve, reject) => {
        resolve(res.send(allbooks.filter(b => b.title == req.params.title)));
      });

      get_books_by_title.then(() => console.log("Promise for Task 13 resolved"));
  });

module.exports.general = public_users;
