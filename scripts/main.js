console.log(`main.js loaded`)

// Constants
// Constants - Objects
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
    price: "",
  },
  addons: [
    // {
    //   name: "",
    //   price: "",
    // },
  ],
}

const sampleFormValues = {
  billing: "mo",
  personalInfo: {
    name: "Davina Leong",
    emailAddress: "leong.shi.yun@gmail.com",
    phoneNumber: "+65 1234 5678",
  },
  plan: {
    name: "Arcade",
    price: "9",
  },
  addons: [
    {
      name: "Online service",
      price: "1",
    },
    {
      name: "Larger storage",
      price: "2",
    },
    {
      name: "Customizable profile",
      price: "2",
    },
  ],
}

// Constants - Breakpoint
const BREAKPOINT = 940

// Constants - Attributes
const styleAttr = `style`
const formAttr = `form`
const checkedAttr = `checked`
const dataCurrentPaneAttr = `data-current-pane`
const dataActiveAttr = `data-active`
const dataHasError = `data-has-error`
const dataSelectedPlan = `data-selected-plan`
const dataSelectedBilling = `data-selected-billing`

// Constants - Elements
const cardEl = document.querySelector(`[data-element="card"]`)
const stepsListEl = document.querySelector(`[data-element="steps-list"]`)
const panesEl = document.querySelector(`[data-element="panes"]`)

const personalInfoFormEl = document.querySelector(
  `[data-element="pane-0"] form`
)
const planFormEl = document.querySelector(`[data-element="pane-1"] form`)
const planFormFirstMonthlyRadioEl = document.querySelector(
  `.form-group[data-plan="arcade"][data-billing="mo"] input[type=radio]`
)
const planFormFirstYearlyRadioEl = document.querySelector(
  `.form-group[data-plan="arcade"][data-billing="yr"] input[type=radio]`
)
const planFormRadioEls = planFormEl.querySelectorAll(`input[type="radio"]`)
const billingInputEl = planFormEl.querySelector(`input[name="yearly"]`)

const addonsFormEl = document.querySelector(`[data-element="pane-2"] form`)
const addonsCheckboxEls = addonsFormEl.querySelectorAll(`input[name="addons"]`)

const receiptEl = document.querySelector(`[data-element="receipt"]`)

const btnGoBackEl = document.querySelector(`[data-element="btn-go-back"]`)
const btnNextStepEl = document.querySelector(`[data-element="btn-next-step"]`)
const btnConfirmEl = document.querySelector(`[data-element="btn-confirm"]`)

// Setup
resetForm()

// Adding Event Listeners
personalInfoFormEl.addEventListener(`submit`, (event) =>
  onPersonalInfoFormElSubmit(event)
)

billingInputEl.addEventListener(`click`, (event) => {
  planFormRadioEls.forEach(
    (planFormRadioEl) => (planFormRadioEl.checked = false)
  )

  addonsCheckboxEls.forEach(
    (addonsCheckboxEl) => (addonsCheckboxEl.checked = false)
  )

  // Yearly
  if (billingInputEl.checked) {
    formValues.billing = billings.yearly
    planFormFirstYearlyRadioEl.checked = true
  }

  // Monthly
  else {
    formValues.billing = billings.monthly
    planFormFirstMonthlyRadioEl.checked = true
  }

  planFormEl.setAttribute(dataSelectedBilling, formValues.billing)
  addonsFormEl.setAttribute(dataSelectedBilling, formValues.billing)
})

planFormEl.addEventListener(`submit`, (event) => onPlanFormElSubmit(event))

addonsFormEl.addEventListener(`submit`, (event) => onAddonsFormSubmit(event))

btnGoBackEl.addEventListener(`click`, (event) => {
  let currentPane = Number(cardEl.getAttribute(dataCurrentPaneAttr))
  currentPane--
  translatePanes(currentPane)
})

btnConfirmEl.addEventListener(`click`, (event) => {
  let currentPane = Number(cardEl.getAttribute(dataCurrentPaneAttr))
  currentPane++
  translatePanes(currentPane)
})

// Functions
function resetForm() {
  stepsListEl
    .querySelector(`[data-element="step-0"]`)
    .setAttribute(dataActiveAttr, true)

  planFormRadioEls.forEach(
    (planFormRadioEl) => (planFormRadioEl.checked = false)
  )

  planFormFirstMonthlyRadioEl.checked = true
  planFormFirstYearlyRadioEl.checked = false

  billingInputEl.checked = false

  addonsCheckboxEls.forEach(
    (addonsCheckboxEl) => (addonsCheckboxEl.checked = false)
  )
  ;(formValues.billing = billings.monthly),
    (formValues.personalInfo = {
      name: "",
      emailAddress: "",
      phoneNumber: "",
    })
  formValues.plan = {
    name: "",
    pro: "",
    note: "",
  }
  formValues.addons = []
}

function splitString(string, separator = "|") {
  return string.split(separator)
}

function translatePanes(currentPane) {
  console.log(`fn: translatePanes`)

  if (Number(currentPane) <= 0) {
    currentPane = 0
  }

  if (Number(currentPane) >= 4) {
    currentPane = 4
  }

  const currentForm = currentPane <= 3 ? forms[currentPane] : ``

  const windowWidth = window.innerWidth
  const paneEl = panesEl.querySelector(`[data-element="pane-1"]`)
  const paneWidth = paneEl.clientWidth
  const paneHeight = paneEl.clientHeight
  const translate =
    windowWidth < BREAKPOINT
      ? currentPane * paneWidth * -1
      : currentPane * paneHeight * -1
  const translateStr =
    windowWidth < BREAKPOINT ? `${translate}px 0` : `0 ${translate}px`

  const stepItemEls = stepsListEl.querySelectorAll(`.steps-list__item`)
  stepItemEls.forEach((stepItemEl) =>
    stepItemEl.removeAttribute(dataActiveAttr)
  )
  const currentPaneEl = stepsListEl.querySelector(
    `[data-element="step-${currentPane}"]`
  )

  if (currentPaneEl) {
    currentPaneEl.setAttribute(dataActiveAttr, true)
  }

  btnNextStepEl.setAttribute(formAttr, currentForm)

  cardEl.setAttribute(dataCurrentPaneAttr, currentPane)
  panesEl.setAttribute(styleAttr, `--panes-translate: ${translateStr}`)
}

function onPersonalInfoFormElSubmit(event) {
  console.log(`fn: onPersonalInfoFormElSubmit`)
  event.preventDefault()

  formValues.personalInfo = {
    name: "",
    emailAddress: "",
    phoneNumber: "",
  }

  const formGroups = personalInfoFormEl.querySelectorAll(`.form-group`)
  formGroups.forEach((formGroup) => formGroup.removeAttribute(dataHasError))

  let nameValid = false
  let emailValid = false
  let phoneValid = false

  const name = personalInfoFormEl.elements[`name`]
  const nameParent = personalInfoFormEl.querySelector(
    `#${name.id}`
  ).parentElement

  if (name.value !== "" && name.value.length >= 5) {
    nameValid = true
  } else {
    nameParent.setAttribute(dataHasError, true)
  }

  const email = personalInfoFormEl.elements[`email`]
  const emailParent = personalInfoFormEl.querySelector(
    `#${email.id}`
  ).parentElement

  if (email.value !== "" && email.value.length >= 5) {
    emailValid = true
  } else {
    emailParent.setAttribute(dataHasError, true)
  }

  const phone = personalInfoFormEl.elements[`phone`]
  const phoneParent = personalInfoFormEl.querySelector(
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

function onPlanFormElSubmit(event) {
  console.log(`fn: onPlanFormElSubmit`)
  event.preventDefault()

  const plan = planFormEl.elements[`plan`]
  if (plan.value) {
    const parts = splitString(plan.value)
    formValues.plan = {
      name: parts[0],
      price: parts[1],
    }

    let currentPane = Number(cardEl.getAttribute(dataCurrentPaneAttr))
    currentPane++
    translatePanes(currentPane)
  }
}

function onAddonsFormSubmit(event) {
  console.log(`fn: onAddonsFormSubmit`)
  event.preventDefault()
  formValues.addons = []

  addonsCheckboxEls.forEach((addonsCheckboxEl) => {
    if (addonsCheckboxEl.checked) {
      const parts = splitString(addonsCheckboxEl.value)
      formValues.addons.push({
        name: parts[0],
        price: parts[1],
      })
    }
  })

  generateReceipt()

  let currentPane = Number(cardEl.getAttribute(dataCurrentPaneAttr))
  currentPane++
  translatePanes(currentPane)
}

function generateReceipt() {
  console.log(`fn: generateReceipt`)

  const { billing, plan, addons } = formValues
  let monthlyOrYearly = `Monthly`
  let monthOrYear = `month`
  let plus = `+`
  if (billing === billings.yearly) {
    monthlyOrYearly = `Yearly`
    monthOrYear = `year`
    plus = ``
  }

  let addonsHtml = ``

  let total = 0
  total += Number(plan.price)
  addons.forEach((addon) => {
    const { name, price } = addon

    addonsHtml += `
      <li class="receipt__addons__item">
        <p class="addons-title">${name}</p>
        <p class="addon-price">+$${price}/${billing}</p>
      </li>
    `
    total += Number(price)
  })

  const receiptHtml = `
    <div class="receipt__line-items">
        <div class="receipt__plan">
          <p class="receipt__plan-title">Arcade (${monthlyOrYearly})</p>
          <p class="receipt__plan-link">
            <button
              class="btn btn-link"
              type="button"
              data-element="btn-change"
            >
              Change
            </button>
          </p>
          <p class="receipt__plan-price">$${plan.price}/${billing}</p>
        </div>
        <div class="receipt__divider"></div>
        <ul class="receipt__addons" role="list">${addonsHtml}</ul>
      </div>

      <div class="receipt__total">
        <p class="receipt__total-title">Total (per ${monthOrYear})</p>
        <p class="receipt__total-price">${plus}$${total}/${billing}</p>
      </div>
  `

  receiptEl.innerHTML = receiptHtml
  receiptEl
    .querySelector(`[data-element="btn-change"]`)
    .addEventListener(`click`, (event) => onChangeClicked(event))
}

function onChangeClicked() {
  console.log(`fn: onChangeClicked`)

  formValues.plan = {
    name: "",
    price: "",
  }

  formValues.addons = []

  translatePanes(1)
}
