import API from "./api.js"
import render from "./dom.js"
import factoryFunctions from "./factory.js"

const allEntries = document.querySelector("#entryLog")

const hiddenField = document.querySelector("#journalID")
const dateField = document.querySelector("#journalDate")
const conceptsCoveredField = document.querySelector("#conceptsCovered")
const entryAreaField = document.querySelector(".entryTextArea")
const moodField = document.querySelector("#moodForTheDay")
const submitButton = document.querySelector(".submitButton")


const radioButton = document.querySelector("#radioButton")
const allRadio = document.querySelector("#allRadio")
const greatRadio = document.querySelector("#greatRadio")
const goodRadio = document.querySelector("#goodRadio")
const fineRadio = document.querySelector("#fineRadio")
const notGoodRadio = document.querySelector("#notGoodRadio")
const awfulRadio = document.querySelector("#awfulRadio")

const searchEntries = document.querySelector("#searchEntries")



let data = []


API.entryFetcher().then(arrayOfEntries => {
    // sessionStorage.setItem("journalEntries", JSON.stringify(arrayOfEntries))
    data.push(arrayOfEntries)
    render.displayEntryInDOM(arrayOfEntries)
})

// const edit = (journalID) => {
//     API.editEntry(hiddenField.value, newJournalEntry)
//     .then(
//         hiddenField.innerHTML = ""
//     )
// }

submitButton.addEventListener("click", () => {
    const newJournalEntry = factoryFunctions.createNewJournalEntry(dateField.value, conceptsCoveredField.value, entryAreaField.value, moodField.value)
    // const regularExpression = new RegExp(/^[a-z0-9(){}:;., ]+$/i)
    // const regularCurseWords = new RegExp(/^shit/i)
    // if (dateField.value === "") {
    //     window.alert("Must complete all fields")
    // } else if (regularExpression.test(conceptsCoveredField.value) === false) {
    //     window.alert("Must complete all fields")
    // } else if (regularCurseWords.test(conceptsCoveredField.value) === true) {
    //     window.alert("Sorry, this journal doesn't tolerate curse words")
    // } else if (regularCurseWords.test(entryAreaField.value) === true) {
    //     window.alert("Sorry, this journal doesn't tolerate curse words")
    // } else if (regularExpression.test(entryAreaField.value) === false) {
    //     window.alert("Must complete all fields")
    // } else if (moodField.value === "") {
    //     window.alert("Must complete all fields")
    // } else {
        if (hiddenField.value !== "") {
            API.editEntry(hiddenField.value, newJournalEntry)
            .then(() => {
                API.entryFetcher().then(arrayOfEntries => {
                    data = []
                    data.push(arrayOfEntries)
                    render.displayEntryInDOM(arrayOfEntries)
                    hiddenField.innerHTML = ""
                    dateField.value = ""
                    conceptsCoveredField.value = ""
                    entryAreaField.value = ""
                    moodField.value = ""
                }
            )})
        } else {
            API.entryPost(newJournalEntry).then(() => {
                API.entryFetcher().then(arrayOfEntries => {
                    data = []
                    data.push(arrayOfEntries)
                    render.displayEntryInDOM(arrayOfEntries)
                    console.log(data)
                    dateField.value = ""
                    conceptsCoveredField.value = ""
                    entryAreaField.value = ""
                    moodField.value = ""
                })
            })
        }
    submitButton.classList.remove("turnRed")
    submitButton.innerHTML = "Record Journal Entry"
    // }
})

// edit functionality
const populateFormsToEdit = (entryID) => {
    fetch(`http://localhost:3000/entries/${entryID}`)
    .then(data => data.json())
    .then(entry => {
        hiddenField.value = entry.id
        dateField.value = entry.date
        conceptsCoveredField.value = entry.title
        entryAreaField.value = entry.content
        moodField.value = entry.mood
        submitButton.classList.add("turnRed")
        submitButton.innerHTML = "Edit Journal Entry"
    })
}

// edit event listener
allEntries.addEventListener("click", event => {
    if(event.target.id.startsWith("editEntry")) {
        const journalID = event.target.id.split("--")[1]
        populateFormsToEdit(journalID)
    }
})

// delete functionality
allEntries.addEventListener("click", event => {
    if(event.target.id.startsWith("deleteEntry")) {
        const journalID = event.target.id.split("--")[1]
        API.deleteEntry(journalID)
            .then(API.entryFetcher)
            .then(render.displayEntryInDOM)
            const targetedIndex = data[0].indexOf(journalID)
            data[0].splice(targetedIndex, 1)
    }
})

// radio functionality
radioButton.addEventListener("click", event => {
    if (event.target.name === "mood") {
        const mood = event.target.value
        if (mood === "All") {
            render.displayEntryInDOM(data[0])
            // API.entryFetcher().then(render.displayEntryInDOM)
        } else {
        render.displayEntryInDOM(data[0].filter(object => object.mood === mood))
        // API.radioFetch(mood).then(render.displayEntryInDOM)
        }
    }
})

// const journalObjectsArray = data.map(journalObj => journalObj.values())
// console.log('journalObjectsArray: ', journalObjectsArray);




searchEntries.addEventListener("keyup", () => {
    allEntries.innerHTML = ""
    // API.searchFetch(searchEntries.value).then(render.displayEntryInDOM)

    const filteredArray = data[0].filter(entry => (entry.title.includes(searchEntries.value) || entry.content.includes(searchEntries.value) || entry.date.includes(searchEntries.value) || entry.mood.includes(searchEntries.value)))
    render.displayEntryInDOM(filteredArray)
})





const makeDisappear = document.querySelector(".fieldsContainer")
const threeButtonClicker = document.querySelector(".threeBarContainer")
const displayTitle = document.querySelector(".dailyJournalTitleContainer")


threeButtonClicker.addEventListener('click', () => {
    makeDisappear.classList.toggle("disappear")
    // makeDisappear.classList.toggle("minimizeFontSize")
    threeButtonClicker.classList.toggle("change")
    displayTitle.classList.toggle("disappear")
    // displayTitle.classList.toggle("minimizeFontSize")

})
