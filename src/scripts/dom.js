const allEntries = document.querySelector("#entryLog")

import factoryFunctions from "./factory.js"

const render = {

displayEntryInDOM (entriesToHTML) {
    allEntries.innerHTML = ""
    entriesToHTML.forEach(entry => {
        const entryInDom = factoryFunctions.createJournalEntry(entry)
        allEntries.innerHTML += entryInDom
        // render.displayEntryInDOM(entryInDom)
    });
}

}

export default render