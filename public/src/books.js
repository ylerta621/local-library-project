//when called, this function returns the author with the corresponding id that is passed as an argument
function findAuthorById(authors, id) {
 return authors.find((author) => author.id === id);
}

//returns a book when its id number is passed as an argument; 

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

//returns an array with two nested arrays - one of the arrays contains all books that are currently checked out, the other contains all books that have been returned. 

function partitionBooksByBorrowedStatus(books) {
  let allBooks = [];
  let checkedOutBooks = [];
  let returnedBooks = []
  books.forEach((book) => {
    book.borrows.find((status) => status.returned? returnedBooks.push(book) : checkedOutBooks.push(book));
  });
    allBooks.push(checkedOutBooks);
    allBooks.push(returnedBooks);
    return allBooks;
}

//Returns the first 10 accounts that have checked out a certain book, and adds a 'returned' key/value pair to the account object to indicate if that account still has the book checked out or if they have already returned it. 

function getBorrowersForBook(book, accounts) {
 let bookArray =[];
  accounts.forEach((account) => {
    book.borrows.find((bookId) => {
      if (bookId.id === account.id) {
        account['returned'] = bookId.returned; 
        bookArray.push(account);
      }
    });
  });
  return bookArray.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
