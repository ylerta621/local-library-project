function getTotalBooksCount(books) {
    let counter = 0;
    books.forEach((book) => {
        counter++;
    })
    return counter;
}



function getTotalAccountsCount(accounts) {
    let counter = 0;
    accounts.forEach((account) => {
        counter++;
    })
    return counter;
}



function getBooksBorrowedCount(books) {
    let totalBorrows = 0;
    books.forEach((book) => {
        if (!book.borrows[0].returned) {
            totalBorrows += 1;
        }
    })

    return totalBorrows;
}



function getMostCommonGenres(books) {
    const genres = books.reduce((acc, book) => {
        // assigns genre to be the genre key in the book object
        const { genre } = book;
        //if this genre does not already exist in the accumulator, create a new object with the genre and count
        if (!acc[genre]) {
            acc[genre] = { name: genre, count: 1 }
            //if this genre already exists in the accumulator, increase the count by one; 
        } else {
            acc[genre].count++;
        }

        return acc;
    }, {})
    console.log(genres);
    //gets the values from the 'genres' object, puts them into an array, sorts them(using the sortGenres helper function) and then slices  the array to the top 5 most common genres;  
    return Object.values(genres).sort(sortGenres).slice(0, 5);

}

//helper function for the getMostCommonGenres function
function sortGenres(genreA, genreB) {
    return genreB.count - genreA.count;
}

function getMostPopularBooks(books) {
    const popularBooks = books.map((book) => {
        return { name: book.title, count: book.borrows.length }
    })

    popularBooks.sort((bookA, bookB) => bookA.count < bookB.count ? 1 : -1);

    return popularBooks.slice(0, 5);
}



function getMostPopularAuthors(books, authors) {
    //create an empty array to store each new author object in
    const authorArray = [];
    //go through all author objects in the authors array
    authors.forEach((author) => {

        /*creates an array of book objects with the corresponding id to the current author id 
        --i.e an array of all books for a particular author */
        const authorFilter = books.filter((book) => book.authorId === author.id)
        //adds the length(total number of borrows per book) of each of the author's books and adds them together --> gives the total amount of book borrows for an author
        const authorCount = authorFilter.reduce((totalBorrows, book) => totalBorrows + book.borrows.length, 0); //initital accumulator value MUST be set to 0; 

        //create a object with the authors first and last name and their total borrow count
        authorArray.push({ name: author.name.first + " " + author.name.last, count: authorCount })
    })
    //sort our new author array for the top 5 authors according to borrow count 
    const sortedAuthorArray = authorArray.sort((auth1, auth2) => auth1.count < auth2.count ? 1 : -1);
  console.log(authorArray.slice(0, 5))
    return authorArray.slice(0, 5);
}



module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};