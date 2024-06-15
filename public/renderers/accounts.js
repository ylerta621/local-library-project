function findAccountById(accounts, id) {
  const found = accounts.find((account) => account.id === id)
  return found;
}

function sortAccountsByLastName(accounts) {
  //sorts accounts in alphabetical order by last name 
  const sortedAccounts = accounts.sort((lastA, lastB) => {
    return lastA["name"]["last"] > lastB["name"]["last"] ? 1: -1;
  })
  return sortedAccounts;
}

function getTotalNumberOfBorrows(account, books) {
  const numOfBorrows = books.filter((book) => {
    return book.borrows.some((bookId) => bookId.id === account.id)
  })
  return numOfBorrows.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  let checkedOutBooks = [];
  books.forEach((book) => {
    if(book.borrows.find((bookId) => bookId.id === account.id && !bookId.returned)) {
      checkedOutBooks.push(book);
    }
  })
  checkedOutBooks.forEach((book) => {
    let authorName = authors.find((authId) => authId.id === book.authorId);
    book['author'] = authorName;
  })
  return checkedOutBooks;
}

get

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

