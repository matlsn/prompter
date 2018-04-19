const commandBase = require('../base/commandBase.js')

class Ping extends commandBase {
  get name () {
    return 'ping'
  }

  get aliases () {
    return ['pong', 'pang', 'peng']
  }

  get description () {
    return 'Pong!'
  }

  execute () {
    this.log('Pong!', 'cyan')
  }
}

module.exports = Ping
