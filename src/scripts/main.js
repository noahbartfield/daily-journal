import API from "./api.js"
import render from "./dom.js"
import factoryFunctions from "./factory.js"

const allEntries = document.querySelector("#entryLog")

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


// API.entryFetcher().then(arrayOfEntries => {
//     arrayOfEntries.forEach(entry => {
//         const entryInDom = factoryFunctions.createJournalEntry(entry)
//         render.displayEntryInDOM(entryInDom)
//     });
// })


let data = JSON.parse(sessionStorage.getItem("journalEntries"))
console.log('data: ', data);

API.entryFetcher().then(arrayOfEntries => {
    sessionStorage.setItem("journalEntries", JSON.stringify(arrayOfEntries))
    render.displayEntryInDOM(arrayOfEntries)
})


submitButton.addEventListener("click", () => {
    const newJournalEntry = factoryFunctions.createNewJournalEntry(dateField.value, conceptsCoveredField.value, entryAreaField.value, moodField.value)
    // const newHTMLRep = factoryFunctions.createJournalEntry(newJournalEntry)
    // render.displayEntryInDOM(newHTMLRep)
    // const regularExpression = /\w/
    const regularExpression = new RegExp(/^[a-z0-9(){}:;., ]+$/i)



    // if (dateField.value === "") {
    //     window.alert("Must complete all fields")
    // } else if (regularExpression.test(conceptsCoveredField.value) === false) {
    //     window.alert("Must complete all fields")
    // } else if (regularExpression.test(entryAreaField.value) === false) {
    //     window.alert("Must complete all fields")
    // } else if (moodField.value === "") {
    //     window.alert("Must complete all fields")
    // } else {
        API.entryPost(newJournalEntry).then(() => {
            API.entryFetcher().then(arrayOfEntries => {
                // sessionStorage.setItem("journalEntries", JSON.stringify(arrayOfEntries))
                render.displayEntryInDOM(arrayOfEntries)
            })
        })
    // }
    dateField.value = ""
    conceptsCoveredField.value = ""
    entryAreaField.value = ""
    moodField.value = ""
})

allEntries.addEventListener("click", event => {
    if(event.target.id.startsWith("deleteEntry")) {
        const journalID = event.target.id.split("--")[1]
        API.deleteEntry(journalID)
            .then(API.entryFetcher)
            .then(render.displayEntryInDOM)
    }
})

radioButton.addEventListener("click", event => {
    if (event.target.name === "mood") {
        const mood = event.target.value
        if (mood === "All") {
            API.entryFetcher().then(render.displayEntryInDOM)
        } else {
        API.radioFetch(mood).then(render.displayEntryInDOM)
        }
    }
})


const makeDisappear = document.querySelector(".fieldsContainer")
const threeButtonClicker = document.querySelector(".threeBarContainer")



threeButtonClicker.addEventListener('click', () => {
    makeDisappear.classList.toggle("disappear")
    threeButtonClicker.classList.toggle("change")
})
