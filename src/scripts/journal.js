// const dateOfEntry = document.querySelector("journalDate").value
// const conceptsCoveredOfEntry = document.querySelector("conceptsCovered").value
// const contentOfEntry = document.querySelector("journalEntry").value
// const moodOfEntry = document.querySelector("moodForTheDay").value



const journalEntries = [
    {
        date: "07/18/2019",
        conceptsCovered: "Printing to DOM",
        entryContent: "I successfully printed my journal entries to the DOM. It was incredibly confusing for a while, but it feels halfway clicked right now.",
        mood: "Good"
    },
    {
        date: "07/12/2019",
        conceptsCovered: "Objects",
        entryContent: "Today we learned about objects",
        mood: "Great!"
    },
    {
        date: "07/11/2019",
        conceptsCovered: "foreach",
        entryContent: "Today we learned what 'foreach' is. It was great.",
        mood: "Good"
    },
    {
        date: "07/09/2019",
        conceptsCovered: "First Project Presentations",
        entryContent: "Today we presented our first group projects",
        mood: "Good"
    }
]

const allEntries = document.querySelector("#entryLog")


const createJournalEntry = function (date, title, content, mood) {
    return `
    <section class="journalContainer">
        <h2>${title}</h2>
        <p>${content}</p>
        <p>${date}<p>
        <h4>Mood: ${mood}</h4>
    </section>
    `
}

journalEntries.forEach(entry => {
    let journalEntry = ""
    journalEntry = createJournalEntry(entry.date, entry.conceptsCovered, entry.entryContent, entry.mood)
    allEntries.innerHTML += journalEntry
});



// console.log(allEntries)


// for (let i = 0; i < journalEntry.length; i++) {
//     const entry = journalEntry[i];
//     document.querySelector("#entryLog").innerHTML = 
//     `<h1>${entry.conceptsCovered}</h1>
//     <p>${entry.entryContent}</p>
//     <h4>${entry.date}</h4>
//     <p>${entry.mood}</p>`


// }


// const allEntries = []
// allEntries.push(journalEntry)


// // using foreach
// journalEntry.forEach(data => {
//     console.log(data.date, data.conceptsCovered, data.entryContent, data.mood)
// });


// using for loop
// for (let i = 0; i < journalEntry.length; i++) {
//     const data = journalEntry[i];
//     console.log(data.date, data.conceptsCovered, data.entryContent, data.mood)

// }



// console.log(allEntries)






// journalEntry.forEach(entry => {
//     printToDom(entry)
// });


// function printToDom (entry) {
//     entry = document.querySelector("entryLog").innerHTML

//     return(entry)
// }
