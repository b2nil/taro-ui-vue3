import * as utils from "@taro-ui-vue3/utils/common"

jest.mock('@taro-ui-vue3/utils/common')

let warn: jest.SpyInstance
let uuid: jest.SpyInstance

const asserted: Set<string> = new Set()
const NOOP = () => { }

// Ensure console.warn is called with expected message
const toHaveBeenWarned: jest.CustomMatcher = (received: string) => {
  asserted.add(received)
  const passed = warn.mock.calls.some(args => args[0].indexOf(received) > -1)
  if (passed) {
    return {
      pass: true,
      message: () => `expected "${received}" not to have been warned.`
    }
  } else {
    const msgs = warn.mock.calls.map(args => args[0]).join('\n - ')
    return {
      pass: false,
      message: () =>
        `expected "${received}" to have been warned` +
        (msgs.length
          ? `.\n\nActual messages:\n\n - ${msgs}`
          : ` but no warning was recorded.`)
    }
  }
}

// Ensure previous console.warn is called with expected message
const toHaveBeenWarnedLast: jest.CustomMatcher = (received: string) => {
  asserted.add(received)
  const passed =
    warn.mock.calls[warn.mock.calls.length - 1][0].indexOf(received) > -1
  if (passed) {
    return {
      pass: true,
      message: () => `expected "${received}" not to have been warned last.`
    }
  } else {
    const msgs = warn.mock.calls.map(args => args[0]).join('\n - ')
    return {
      pass: false,
      message: () =>
        `expected "${received}" to have been warned last.\n\nActual messages:\n\n - ${msgs}`
    }
  }
}

// Ensure console.warn is called n times with expected message
const toHaveBeenWarnedTimes: jest.CustomMatcher = (received: string, n: number) => {
  asserted.add(received)
  let found = 0
  warn.mock.calls.forEach(args => {
    if (args[0].indexOf(received) > -1) {
      found++
    }
  })

  if (found === n) {
    return {
      pass: true,
      message: () => `expected "${received}" to have been warned ${n} times.`
    }
  } else {
    return {
      pass: false,
      message: () =>
        `expected "${received}" to have been warned ${n} times but got ${found}.`
    }
  }
}

function initWarnMatchers() {
  beforeEach(() => {
    asserted.clear()
    warn = jest.spyOn(console, 'warn').mockImplementation(NOOP)
    uuid = jest.spyOn(utils, 'uuid').mockReturnValue('__tests__2021')

    // NOT working in concurrent mode
    // should avoid use in test.concurrent()
    expect.extend({
      toHaveBeenWarned,
      toHaveBeenWarnedLast,
      toHaveBeenWarnedTimes
    })
  })

  afterEach(() => {
    const assertedArray = Array.from(asserted)
    const nonAssertedWarnings = warn.mock.calls
      .map(args => args[0])
      .filter(received => {
        return !assertedArray.some(assertedMsg => {
          return received.indexOf(assertedMsg) > -1
        })
      })

    uuid.mockRestore()
    warn.mockRestore()

    if (nonAssertedWarnings.length) {
      throw new Error(
        `test case threw unexpected warnings:\n - ${nonAssertedWarnings.join(
          '\n - '
        )}`
      )
    }
  })
}

export default initWarnMatchers