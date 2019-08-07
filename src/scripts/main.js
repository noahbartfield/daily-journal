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



let data = []


API.entryFetcher().then(arrayOfEntries => {
    // sessionStorage.setItem("journalEntries", JSON.stringify(arrayOfEntries))
    data.push(arrayOfEntries)
    render.displayEntryInDOM(arrayOfEntries)
})

submitButton.addEventListener("click", () => {
    const newJournalEntry = factoryFunctions.createNewJournalEntry(dateField.value, conceptsCoveredField.value, entryAreaField.value, moodField.value)
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
                data = []
                data.push(arrayOfEntries)
                render.displayEntryInDOM(arrayOfEntries)
                console.log(data)
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
            const targetedIndex = data[0].indexOf(journalID)
            data[0].splice(targetedIndex, 1)
    }
})

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



const makeDisappear = document.querySelector(".fieldsContainer")
const threeButtonClicker = document.querySelector(".threeBarContainer")



threeButtonClicker.addEventListener('click', () => {
    makeDisappear.classList.toggle("disappear")
    threeButtonClicker.classList.toggle("change")
})
