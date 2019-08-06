


const API = {

entryFetcher () {
    return fetch("http://localhost:3000/entries")
        .then(data => data.json())

},

entryPost (newJournalEntry) {
    return fetch("http://localhost:3000/entries", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newJournalEntry)
    })
    // .then(data => data.json())  
},

radioFetch (mood) {
    return fetch(`http://localhost:3000/entries?mood=${mood}`)
        .then(data => data.json())
},

deleteEntry (entryID) {
    return fetch(`http://localhost:3000/entries/${entryID}`,
    {
        "method": "DELETE"
    }
    ) 
    .then(data => data.json())
}
}

export default API