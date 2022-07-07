// localStorage.clear();
class Book {
    constructor(title, author, numPages, haveRead) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.haveRead = haveRead;
    }
}

class Library {
    util = new Utility();

    static goToNewBookPage() {
        const newBookBtn = document.getElementById('new-book-btn');
        if (newBookBtn !== null) {
            newBookBtn.addEventListener('click', () => {
            location.href = './new-book.html';
            });
        }
    }

    displayBookCards() {

        for (let i = 0; i < localStorage.length; i++) {
            if (i !== null) {
                let id = localStorage.key(i);
                let bookCard = this.util.createBookCard(id);
                let bookInfo = localStorage.getItem(id);
                const bookObj = JSON.parse(bookInfo);
                for (const key in bookObj){
                    if (key === 'title') {
                        this.util.createRow('Title:', bookObj[key], bookCard, 'title-text');
                    }
                    if (key === 'author') {
                        this.util.createRow('Author:', bookObj[key], bookCard, 'author-text');
                    }
                    if (key === 'numPages') {
                        this.util.createRow('No. Pages:', bookObj[key], bookCard, 'num-pages-text');
                    }
                    if (key === 'haveRead') {
                        this.util.createRow('Completed:', bookObj[key], bookCard, 'have-read-text');
                    }
                }
            }
        }
    }

    removeButtonClicked() {
        let removeBtns = Array.from(document.getElementsByClassName('remove-btn'));
        if (removeBtns.length > 0) {
            removeBtns.forEach(button => button.addEventListener('click', () => {
                const btnDiv = button.parentNode
                const bookCard = btnDiv.parentNode;
                const bookCardId = bookCard.id;
                localStorage.removeItem(bookCardId);
                bookCard.remove();
            }));
        }
    }
    
    haveReadChecked() {
        let haveReadBtns = Array.from(document.getElementsByClassName('have-read-checkbox'));
        if (haveReadBtns.length > 0) {
            haveReadBtns.forEach(checkbox => checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    const checkboxDiv = checkbox.parentNode;
                    const btnDiv = checkboxDiv.parentNode;
                    const bookCard = btnDiv.parentNode;
                    const bookCardId = bookCard.id;
                    const haveReadElement = Array.from(bookCard.getElementsByClassName('have-read-text'))[0];
                    haveReadElement.textContent = 'Yes';
    
                    let book = localStorage.getItem(bookCardId);
                    book = JSON.parse(book);
                    book.haveRead = 'Yes';
                    localStorage.setItem(bookCardId, JSON.stringify(book));
                }
            }));
        }
    }
}

class BookForm {
    static goToLibraryPage() {
        const libBtn = document.getElementById('lib-btn');
        if (libBtn !== null) {
            libBtn.addEventListener('click', () => {
                location.href = './index.html';
            });
        }
    }
    submitButtonClicked() {
        const submitBtn = document.getElementById('submit-btn');
        if (submitBtn !== null) {
            submitBtn.addEventListener('click', () => {
                const title = this.getNewBookInfo('title');
                const author = this.getNewBookInfo('author');
                const numPages = this.getNewBookInfo('num-pages');
                const haveRead = this.getNewBookInfo('have-read');
                const newBook = new Book(title, author, numPages, haveRead);
    
                localStorage.setItem(this.getNewIndex(), JSON.stringify(newBook));

                this.clearField('title');
                this.clearField('author');
                this.clearField('num-pages');
                this.clearField('have-read');
            });
        }
    }

    getNewBookInfo(elementId) {
        const element = document.getElementById(elementId);
        if (element.type === 'checkbox' && element.checked === true) {
            return 'Yes';
        } else if (element.type === 'checkbox' && element.checked === false) {
            return 'Not yet';
        }

        return element.value;
    }

    clearField(elementId) {
        const element = document.getElementById(elementId);
        element.value = '';
    }

    getNewIndex() {
        let highKey = 0;
        for (let i = 0; i < localStorage.length; i++) {
            if(+localStorage.key(i) >= highKey) {
                highKey = +localStorage.key(i) + +1;
            }
        }
        return highKey;
    }
}

class Utility {
    bookCardContainer = document.getElementById('book-card-container');
    createBookCard(cardCount) {
        if (this.bookCardContainer !== null) {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            bookCard.setAttribute('id', cardCount);
    
            const btnDiv = this.createButtonDiv();
            bookCard.appendChild(btnDiv);
    
            const removeBtn = this.createRemoveButton();
            removeBtn.setAttribute('id', `remove-btn-${cardCount}`);
            btnDiv.appendChild(removeBtn);
    
            let card = localStorage.getItem(cardCount);
            if (bookCard !== null && JSON.parse(card).haveRead !== 'Yes') {
                const checkboxDiv = this.createCheckBoxDiv();
                const haveReadCheckBox = this.createHaveReadCheckBox();
                haveReadCheckBox.setAttribute('id', `read-checkbox-${cardCount}`)
                const haveReadLabel = this.createHaveReadLabel();
                checkboxDiv.appendChild(haveReadCheckBox);
                checkboxDiv.appendChild(haveReadLabel);
                btnDiv.appendChild(checkboxDiv);
            }
    
            this.bookCardContainer.appendChild(bookCard);
            return bookCard;
        }
    }

    createRow(rowTitle, cellText, bookCard, className) {
        if (this.bookCardContainer !== null) {
            const rowTitleElement = document.createElement('p');
            rowTitleElement.classList.add('row-title');
            const rowTitleText = document.createTextNode(rowTitle);
            rowTitleElement.appendChild(rowTitleText);
            bookCard.appendChild(rowTitleElement);
            
            const bookInfoElement = document.createElement('p');
            const bookInfoText = document.createTextNode(cellText);
            bookInfoElement.classList.add(className);
            bookInfoElement.appendChild(bookInfoText);
            bookCard.appendChild(bookInfoElement);
        }
    }
    createButtonDiv() {
        const btnDiv = document.createElement('div');
        btnDiv.classList.add('btn-div');
        return btnDiv;
    }
    
    createCheckBoxDiv() {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.classList.add('checkbox-div');
        return checkboxDiv;
    }
    
    createRemoveButton() {
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        return removeBtn;
    }
    
    createHaveReadCheckBox() {
        const haveReadCheckBox = document.createElement('input')
        haveReadCheckBox.setAttribute('type', 'checkbox');
        haveReadCheckBox.classList.add('have-read-checkbox');
        return haveReadCheckBox;
    }
    
    createHaveReadLabel() {
        const haveReadLabel = document.createElement('label')
        haveReadLabel.textContent = 'Finished reading?'
        return haveReadLabel;
    }
}

Library.goToNewBookPage();
BookForm.goToLibraryPage();

let lib = new Library();
lib.displayBookCards();
lib.removeButtonClicked();
lib.haveReadChecked();

let bookForm = new BookForm();
bookForm.submitButtonClicked();
