const c = require('chalk')

class commandBase {
  get name () {
    throw new Error('Name must not be blank!')
  }

  get aliases () {
    return ['']
  }

  get description () {
    return 'No description.'
  }

  execute () {
    throw new Error('Execute must not be blank!')
  }

  log (content, color = process.env.DEFAULT_LOG_COLOR || 'white') {
    if (content.constructor === Array) content.forEach((i) => { console.log(c[color](i)) })
    else console.log(c[color](content))
  }
}

module.exports = commandBase
