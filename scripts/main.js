console.log(`main.js loaded`)

// Variables
const plans = {
  arcade: "Arcade",
  advanced: "Advanced",
  pro: "Pro",
}

const billing = {
  monthly: "mo",
  yearly: "yr",
}

const addons = {
  onlineService: "Online service",
  largerStorage: "Larger storage",
  customizableProfile: "Customizable profile",
}

const formValues = {
  billing: billing.monthly,
  personalInfo: {
    name,
    emailAddress,
    phoneNumber,
  },
  plan: {
    name,
    pro,
    note,
  },
  addons: [
    // {
    //   name,
    //   price,
    // },
  ],
}

const styleAttr = `style`
const dataCurrentPaneAttr = `data-current-pane`
const dataActiveAttr = `data-active`

const cardEl = document.querySelector(`[data-element="card"]`)
const stepsListEl = document.querySelector(`[data-element="steps-list"]`)
const panesEl = document.querySelector(`[data-element="panes"]`)

const btnGoBackEl = document.querySelector(`[data-element="btn-go-back"]`)
const btnNextStepEl = document.querySelector(`[data-element="btn-next-step"]`)
const btnConfirmEl = document.querySelector(`[data-element="btn-confirm"]`)

stepsListEl
  .querySelector(`[data-element="step-0"]`)
  .setAttribute(dataActiveAttr, true)

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

btnConfirmEl.addEventListener(`click`, (event) => {
  let currentPane = Number(panesEl.getAttribute(dataCurrentPaneAttr))
  currentPane++
  translatePanes(currentPane)
})

// Functions
function translatePanes(currentPane) {
  if (Number(currentPane) <= 0) {
    currentPane = 0
  }

  if (Number(currentPane) >= 4) {
    currentPane = 4
  }

  console.log(currentPane)

  const paneEl = panesEl.querySelector(`[data-element="pane-1"]`)
  const paneWidth = paneEl.clientWidth
  console.log(paneWidth)
  const translate = currentPane * paneWidth * -1

  const stepItemEls = stepsListEl.querySelectorAll(`.steps-list__item`)
  stepItemEls.forEach((stepItemEl) =>
    stepItemEl.removeAttribute(dataActiveAttr)
  )
  stepsListEl
    .querySelector(`[data-element="step-${currentPane}"]`)
    .setAttribute(dataActiveAttr, true)

  cardEl.setAttribute(dataCurrentPaneAttr, currentPane)
  panesEl.setAttribute(styleAttr, `--panes-translate: ${translate}px 0`)
}
