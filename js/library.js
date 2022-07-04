let myLibrary = [];
let newBooks = [];
// localStorage.clear();

function Book(title, author, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
    this.info = function() {
        return `${title} by ${author}, ${numPages} pages, ${haveRead}`;
    }
}

const book1 = new Book("The Monk and the Riddle", "Randy Komisar", 208, true);
const book2 = new Book("Zero to One", "Peter Thiel", 224, false);
const book3 = new Book("Natural Born Heroes", "Christopher McDougall", 352, false);
myLibrary.push(book1, book2, book3);

function goToNewBookPage() {
    const newBookBtn = document.getElementById('new-book-btn');
    if (newBookBtn !== null) {
        newBookBtn.addEventListener('click', () => {
        location.href = './new-book.html';
        });
    }
}

function goToLibraryPage() {
    const libBtn = document.getElementById('lib-btn');
    if (libBtn !== null) {
        libBtn.addEventListener('click', () => {
            location.href = './index.html';
        });
    }
}

goToNewBookPage();
goToLibraryPage();

// save form data on submission
function submitButtonClicked() {
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn !== null) {
        submitBtn.addEventListener('click', () => {
            const title = getNewBookInfo('title');
            const author = getNewBookInfo('author');
            const numPages = getNewBookInfo('num-pages');
            const haveRead = getNewBookInfo('have-read');
            
            const newBook = new Book(title, author, numPages, haveRead);
            localStorage.setItem('count', +localStorage.getItem('count') + +1);
            localStorage.setItem(localStorage.getItem('count'), JSON.stringify(newBook));
        });
    }
}

function getNewBookInfo(elementId) {
    const element = document.getElementById(elementId);
    if (element.type === 'checkbox') {
        return element.checked;
    }
    return element.value;
}

submitButtonClicked();

function addNewBookToLibrary() {
    for (let i = 1; i <= localStorage.getItem('count'); i++) {
        let newBook = localStorage.getItem(localStorage.getItem('count'));
        newBook = JSON.parse(newBook);
        myLibrary.push(newBook);
    }
}

addNewBookToLibrary();
console.log(myLibrary);

// Convert book data from myLibrary array into cards

const bookCardContainer = document.getElementById('book-card-container');
let cardCount = 1;

myLibrary.forEach(book => {
    let bookCard = createBookCard(cardCount);
    cardCount++;
    for (const key in book) {
        if (key === 'title') {
            createRow('Title', book[key], bookCard);
        }
        if (key === 'author') {
            createRow('Author', book[key], bookCard);
        }
        if (key === 'numPages') {
            createRow('No. Pages', book[key], bookCard);
        }
        if (key === 'haveRead') {
            createRow('Completed', book[key], bookCard);
        }
    }
});

function createBookCard(cardCount) {
    if (bookCardContainer !== null) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('id', cardCount);
        bookCardContainer.appendChild(bookCard);
        return bookCard;
    }
}

function createRow(rowTitle, cellText, bookCard) {
    if (bookCardContainer !== null) {
        const rowTitleElement = document.createElement('p');
        const rowTitleText = document.createTextNode(rowTitle);
        rowTitleElement.appendChild(rowTitleText);
        bookCard.appendChild(rowTitleElement);
        
        const bookInfoElement = document.createElement('p');
        const bookInfoText = document.createTextNode(cellText);
        bookInfoElement.appendChild(bookInfoText);
        bookCard.appendChild(bookInfoElement);
    }
}
