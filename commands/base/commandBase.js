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
    console.log('Default command execute!')
  }

  log (content, color = 'white') {
    if (content.constructor === Array) content.forEach((i) => { console.log(c[color](i)) })
    else console.log(c[color](content))
  }
}

module.exports = commandBase
