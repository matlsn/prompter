const commandBase = require('../base/commandBase.js')

class InputReturn extends commandBase {
  get name () {
    return 'inputreturn'
  }

  get usage () {
    return '[args]'
  }

  get aliases () {
    return ['ir', 'input', 'return']
  }

  get description () {
    return 'Returns input.'
  }

  execute (msg, args) {
    const messageArray = [`Full message: ${msg}`, `Arguments: ${args ? args.join(' ') : 'none'}`]
    this.log(messageArray, 'cyan')
  }
}

module.exports = InputReturn
