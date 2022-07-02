let myLibrary = [];

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
    if (newBookBtn === null) {
    
    } else {
        newBookBtn.addEventListener('click', () => {
        location.href = "./new-book.html"; 
        });
    }
}

goToNewBookPage();

// save form data on submission
function submitButtonClicked() {
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn === null) {
    
    } else {
    submitBtn.addEventListener('click', () => {
        const title = getNewBookInfo('title');
        const author = getNewBookInfo('author');
        const numPages = getNewBookInfo('num-pages');
        const haveRead = getNewBookInfo('have-read');
        const newBook = new Book(title, author, numPages, haveRead);
        myLibrary.push(newBook);
        console.log(myLibrary);
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
console.log(myLibrary);


// Convert book data from myLibrary array into cards

const bookCardContainer = document.getElementById('book-card-container');

myLibrary.forEach(book => {
    let bookCard = createBookCard();

    for (const key in book) {
        if (key === 'title') {
            const rowTitle = addCellText('Title');
            bookCard.appendChild(rowTitle);
            const bookInfo = addCellText(book[key]);
            bookCard.appendChild(bookInfo);
        }
    }
});

function createBookCard() {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCardContainer.appendChild(bookCard);
    return bookCard;
}

// Consider adding class name as a paramter to this function
function addCellText(cellText) {
    const para = document.createElement('p');
    const text = document.createTextNode(cellText);
    para.appendChild(text);
    return para;
}

