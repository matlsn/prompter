const c = require('chalk')
const prompts = require('prompts')
const fs = require('fs')
require('dotenv').config()

const main = {
  aCmd: {},
  sCmd (cmdN, cmd) {
    this.aCmd[cmdN] = cmd
  }
}

const commandFiles = fs.readdirSync('./commands/plugins')
for (const file of commandFiles) {
  const command = require(`./commands/plugins/${file}`)
  main.aCmd[command.name] = command
}

async function getInput () {
  const message = await prompts({
    type: 'text',
    name: 'input',
    message: '',
    initial: 'help'
  })
  if (!message.input) console.log(c.blue("Type 'exit' to quit!"))
  else {
    message.input = message.input.split(' ')
    if (message.input[0] === 'exit') {
      // Exit command
      console.log(c[process.env.DEFAULT_LOG_COLOR || 'white'](process.env.EXIT_MSG || 'Exiting...'))
      process.exit(0)
    } else if (message.input[0] === 'help') {
      // Help command
      let helpMessage = `${c.underline.bold.cyan('Help Menu')}\n`
      for (let item in main.aCmd) {
        const cmd = new main.aCmd[item]()
        helpMessage += `\n${c.bgBlue(` ${cmd.name}${cmd.usage ? ' ' + cmd.usage : ''} `)} - ${cmd.description}`
      }
      console.log(`${helpMessage}\n${c.bgBlue(` exit `)} - Exits the application.\n${c.bgBlue(` help `)} - Shows this menu.`)
    } else {
      // Plugins
      try {
        const command = message.input[0].toLowerCase()
        let index = 0
        for (let item in main.aCmd) {
          index++
          const cmd = new main.aCmd[item]()
          if (!(command === cmd.name) && !(cmd.aliases.indexOf(command) >= 0)) {
            if (index === Object.keys(main.aCmd).length) throw new Error()
            continue
          } else {
            try {
              let args = null
              if (message.input.length > 1) {
                args = message.input.slice(0)
                args.shift()
              }
              cmd.execute(message.input.length > 1 ? message.input.slice(0).join(' ') : message.input[0], args)
              break
            } catch (err) {
              console.log(c[process.env.DEFAULT_LOG_COLOR || 'white']('There was an error!\n\n') + err)
              break
            }
          }
        }
      } catch (err) {
        console.log(c[process.env.DEFAULT_LOG_COLOR || 'white']('Invalid command!'))
      }
    }
  }
  getInput()
}

getInput()
