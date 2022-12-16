console.log(`main.js loaded`)

// Variables
const styleAttr = `style`
const dataCurrentPaneAttr = `data-current-pane`

const panesEl = document.querySelector(`[data-element="panes"]`)

const btnGoBackEl = document.querySelector(`[data-element="btn-go-back"]`)
const btnNextStepEl = document.querySelector(`[data-element="btn-next-step"]`)
const btnConfirmEl = document.querySelector(`[data-element="btn-confirm"]`)

btnGoBackEl.addEventListener(`click`, (event) => {
  let currentPane = Number(panesEl.getAttribute(dataCurrentPaneAttr))
  currentPane--
  translatePanes(currentPane)
})

btnNextStepEl.addEventListener(`click`, (event) => {
  let currentPane = Number(panesEl.getAttribute(dataCurrentPaneAttr))
  currentPane++
  translatePanes(currentPane)
})

// Functions
function translatePanes(currentPane) {
  if (Number(currentPane) <= 1) {
    currentPane = 1
  }

  if (Number(currentPane) >= 5) {
    currentPane = 5
  }

  panesEl.setAttribute(dataCurrentPaneAttr, currentPane)

  const paneEl = panesEl.querySelector(`[data-element="pane-1"]`)
  const paneWidth = paneEl.clientWidth
  const translate = currentPane * paneWidth

  panesEl.setAttribute(styleAttr, `--panes-translate: ${translate}px 0`)
}
