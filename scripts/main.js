console.log(`main.js loaded`)

// Variables
const directions = {
  prev: "prev",
  next: "next",
}

const plans = {
  arcade: "Arcade",
  advanced: "Advanced",
  pro: "Pro",
}

const billings = {
  monthly: "mo",
  yearly: "yr",
}

const addons = {
  onlineService: "Online service",
  largerStorage: "Larger storage",
  customizableProfile: "Customizable profile",
}

const forms = {
  0: "personal-info-form",
  1: "plan-form",
  2: "addons-form",
}

const formValues = {
  billing: billings.monthly,
  personalInfo: {
    name: "",
    emailAddress: "",
    phoneNumber: "",
  },
  plan: {
    name: "",
    pro: "",
    note: "",
  },
  addons: [
    // {
    //   name: "",
    //   price: "",
    // },
  ],
}

const styleAttr = `style`
const formAttr = `form`
const dataCurrentPaneAttr = `data-current-pane`
const dataActiveAttr = `data-active`
const dataHasError = `data-has-error`

const cardEl = document.querySelector(`[data-element="card"]`)
const stepsListEl = document.querySelector(`[data-element="steps-list"]`)
const panesEl = document.querySelector(`[data-element="panes"]`)

const personalInfoForm = document.querySelector(`[data-element="pane-0"] form`)
const planForm = document.querySelector(`[data-element="pane-1"] form`)
const addonsForm = document.querySelector(`[data-element="pane-2"] form`)

const btnGoBackEl = document.querySelector(`[data-element="btn-go-back"]`)
const btnNextStepEl = document.querySelector(`[data-element="btn-next-step"]`)
const btnConfirmEl = document.querySelector(`[data-element="btn-confirm"]`)

// Adding Event Listeners
personalInfoForm.addEventListener(`submit`, (event) =>
  onPersonalInfoFormSubmit(event)
)

stepsListEl
  .querySelector(`[data-element="step-0"]`)
  .setAttribute(dataActiveAttr, true)

btnGoBackEl.addEventListener(`click`, (event) => {
  let currentPane = Number(cardEl.getAttribute(dataCurrentPaneAttr))
  currentPane--
  translatePanes(currentPane)
})

btnNextStepEl.addEventListener(`click`, (event) => {
  let currentPane = Number(cardEl.getAttribute(dataCurrentPaneAttr))
  // currentPane++
  // translatePanes(currentPane)
})

btnConfirmEl.addEventListener(`click`, (event) => {
  let currentPane = Number(cardEl.getAttribute(dataCurrentPaneAttr))
  currentPane++
  translatePanes(currentPane)
})

// Functions
function translatePanes(currentPane) {
  console.log(`fn: translatePanes`)

  if (Number(currentPane) <= 0) {
    currentPane = 0
  }

  if (Number(currentPane) >= 4) {
    currentPane = 4
  }

  const currentForm = currentPane <= 3 ? forms[currentPane] : ``

  console.log(`currentForm: ${currentForm}`, `currentPane: ${currentPane}`)

  const paneEl = panesEl.querySelector(`[data-element="pane-1"]`)
  const paneWidth = paneEl.clientWidth
  const translate = currentPane * paneWidth * -1

  const stepItemEls = stepsListEl.querySelectorAll(`.steps-list__item`)
  stepItemEls.forEach((stepItemEl) =>
    stepItemEl.removeAttribute(dataActiveAttr)
  )
  stepsListEl
    .querySelector(`[data-element="step-${currentPane}"]`)
    .setAttribute(dataActiveAttr, true)

  btnNextStepEl.setAttribute(formAttr, currentForm)

  cardEl.setAttribute(dataCurrentPaneAttr, currentPane)
  panesEl.setAttribute(styleAttr, `--panes-translate: ${translate}px 0`)
}

function onPersonalInfoFormSubmit(event) {
  event.preventDefault()

  formValues.personalInfo = {
    name: "",
    emailAddress: "",
    phoneNumber: "",
  }

  const formGroups = personalInfoForm.querySelectorAll(`.form-group`)
  formGroups.forEach((formGroup) => formGroup.removeAttribute(dataHasError))

  let nameValid = false
  let emailValid = false
  let phoneValid = false

  const name = personalInfoForm.elements[`name`]
  const nameParent = personalInfoForm.querySelector(`#${name.id}`).parentElement

  if (name.value !== "" && name.value.length >= 5) {
    nameValid = true
  } else {
    nameParent.setAttribute(dataHasError, true)
  }

  const email = personalInfoForm.elements[`email`]
  const emailParent = personalInfoForm.querySelector(
    `#${email.id}`
  ).parentElement

  if (email.value !== "" && email.value.length >= 5) {
    emailValid = true
  } else {
    emailParent.setAttribute(dataHasError, true)
  }

  const phone = personalInfoForm.elements[`phone`]
  const phoneParent = personalInfoForm.querySelector(
    `#${phone.id}`
  ).parentElement

  if (phone.value !== "" && phone.value.length >= 5) {
    phoneValid = true
  } else {
    phoneParent.setAttribute(dataHasError, true)
  }

  if (nameValid && emailValid && phoneValid) {
    formValues.personalInfo = {
      name: name.value,
      emailAddress: email.value,
      phoneNumber: phone.value,
    }

    let currentPane = Number(cardEl.getAttribute(dataCurrentPaneAttr))
    currentPane++
    translatePanes(currentPane)
  }
}
