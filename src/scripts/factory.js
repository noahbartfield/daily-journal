
const factoryFunctions = {

createJournalEntry (journalEntry) {
    return `
    <section class="journalContainer">
        <h2>${journalEntry.title}</h2>
        <p>${journalEntry.content}</p>
        <p>${journalEntry.date}<p>
        <h4>Mood: ${journalEntry.mood}</h4>
        <button class="deleteButton" id="deleteEntry--${journalEntry.id}">Delete</button>
    </section>
    `
},

createNewJournalEntry (date, title, content, mood) {
    return {
        date: date,
        title: title,
        content: content,
        mood: mood
    }
}

}

export default factoryFunctions