

const getSavedNotes = function () {
    return JSON.parse(localStorage.getItem('notes')) || [];
};

const setLocalNotes = function (notes) {
    if (notes.length != 0) {
        localStorage.setItem('notes',JSON.stringify(notes));
    } else {
        localStorage.clear();
    }
}

const removeNote = function (noteId) {
    notes.forEach((el,index) => {
        if (el.id === noteId) {
            notes.splice(index,1);
        };
    });
};

const sortBy = function(notes,way) {
    if (way === 'lastEdited') {
        notes = notes.sort((a,b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            } else if (a.updatedAt > b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (way === 'realted') {
        notes = notes.sort((a,b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt > b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (way === 'alphabetically') {
        notes = notes.sort((a,b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        })
    }
    
    return notes;
}

const generateNoteDom = (note) => {
    const noteItemEl = document.createElement('a');
    noteItemEl.setAttribute('href', `edit.html#${note.id}`);
    noteItemEl.classList.add('list-item');
    

    const noteTextEl = document.createElement('p');
    note.title.length > 0 ? noteTextEl.textContent = note.title : noteTextEl.textContent = 'Unnamed note';
    noteItemEl.appendChild(noteTextEl);

    const statusEl = document.createElement('p');
    statusEl.textContent = generateLastEdited(note.updatedAt);
    statusEl.classList.add('list-item__subtitle');
    noteItemEl.appendChild(statusEl);



    return noteItemEl;
};

const renderNotes = function (notes, filters) {
    notes = sortBy(notes,filters.sortBy);
    const notesContainer = document.getElementById('notesContainer');
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));
    
    notesContainer.innerHTML = '';
    if (filteredNotes.length > 0){
        filteredNotes.forEach(el => {
            const note = generateNoteDom(el);
            notesContainer.appendChild(note);
        })
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No notes to show !';
        emptyMessage.classList.add('empty-message');
        notesContainer.appendChild(emptyMessage);
    }
};


const generateLastEdited = function (timeStamp) {
    return `Last update at ${moment(timeStamp).fromNow()}`;
}