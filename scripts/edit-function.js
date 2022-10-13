const noteId = location.hash.substring(1);
let notes = getSavedNotes();
if (!notes) {
    location.assign('index.html')
};
let thisNote = notes.find(el => el.id === noteId);

const noteTitle = document.getElementById('noteTitle'); 
const noteBody = document.getElementById('noteBody');
const lastUpdated = document.getElementById('lastUpdated');
noteTitle.value = thisNote.title;
noteBody.value = thisNote.body;

lastUpdated.textContent = generateLastEdited(thisNote.updatedAt);

noteTitle.addEventListener('input', (e) => {
    thisNote.title = e.target.value;
    thisNote.updatedAt = moment().valueOf();
    lastUpdated.textContent = generateLastEdited(thisNote.updatedAt);
    setLocalNotes(notes);
    
});

noteBody.addEventListener('input', e => {
    thisNote.body = e.target.value;
    thisNote.updatedAt = moment().valueOf();
    lastUpdated.textContent = generateLastEdited(thisNote.updatedAt);
    setLocalNotes(notes);
});

document.getElementById('removeThisNoteBtn').addEventListener('click', () => {
    removeNote(noteId);
    setLocalNotes(notes);
    location.assign('index.html');
});

window.addEventListener('storage', e => {
    if (e.key === 'notes') {
        notes = getSavedNotes();
        if (!notes) {
            location.assign('index.html')
        }
        thisNote = notes.find(el => el.id === noteId);
        noteTitle.value = thisNote.title;
        noteBody.value = thisNote.body;
        lastUpdated.textContent = generateLastEdited(thisNote.updatedAt);
    }
});


