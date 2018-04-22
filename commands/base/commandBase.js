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
    try {
      const clrFunc = (color.startsWith('#') || color === 'random') ? c.hex(color === 'random' ? this.randHex() : color) : c[color]
      if (content.constructor === Array) content.forEach((i) => { console.log(clrFunc(i)) })
      else console.log(console.log(clrFunc(content)))
    } catch (err) { throw new Error('"log" input error') }
  }

  randInt (min, max) {
    min = parseInt(min, 10)
    max = parseInt(max, 10)
    if ((min > max) || min === max) throw new Error('"randInt" input error')
    else return ~~(Math.random() * (max - min)) + min
  }

  randSelect (array) {
    if (array.constructor !== Array) throw new Error('"randSelect" input must be an array')
    else return array[~~(Math.random() * array.length)]
  }

  randHex () {
    return `#${('000000' + (Math.random() * 0xFFFFFF << 0).toString(16)).slice(-6)}`
  }
}

module.exports = commandBase
