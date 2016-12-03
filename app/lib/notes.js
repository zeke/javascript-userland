const dedent = require('dedent')
const {ipcRenderer} = require('electron')

// Display slide notes in the terminal
module.exports = function logNotes(section) {
  let notes = section.querySelector('aside')
  if (!notes || !notes.textContent.length ) return

  notes = dedent`--------------------------\n${notes.textContent}`

  let next = section.nextElementSibling
  if (next) {
    let nextNotes = next.querySelector('aside')
    if (nextNotes && nextNotes.textContent) {
      notes += `\nNext: ${dedent(nextNotes.textContent.substr(0, 50))}`
    }
  }

  // log notes in browser console and shell
  console.log(notes)
  ipcRenderer.send('notes', notes)
}
