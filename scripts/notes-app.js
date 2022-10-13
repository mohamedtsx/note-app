
let notes = getSavedNotes();

const filters = {
    searchText: '',
    sortBy: ''
};

renderNotes(notes,filters);

document.getElementById('notesFilter').addEventListener('input', e => {
    filters.searchText = e.target.value;
    renderNotes(notes,filters);
});

document.getElementById('sortBy').addEventListener('change', e => {
    filters.sortBy = e.target.value;
    renderNotes(notes,filters);
}); 

document.getElementById('createNoteBtn').addEventListener('click', (e) => {
    const noteId = uuidv4();
    const timeStamp = moment().valueOf();
    notes.push({
        title: '',
        body: '',
        id: noteId,
        createdAt: timeStamp,
        updatedAt: timeStamp
    });
    setLocalNotes(notes);
    location.assign(`edit.html#${noteId}`);
});

document.getElementById('sortBy').addEventListener('change', e => {
    filters.sortBy = e.target.value;
})

window.addEventListener('storage', e => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue);
        renderNotes(notes,filters);
    }
});

