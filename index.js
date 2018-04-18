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
  main.sCmd(command.name, command)
}

async function getInput () {
  const response = await prompts({
    type: 'text',
    name: 'input',
    message: '',
    initial: 'help'
  })
  if (!response.input) console.log(c.red("Type 'exit' to quit!"))
  else {
    if (response.input === 'exit') {
      console.log(c.red(process.env.EXITMSG || 'Exiting...'))
      process.exit(0)
    } else if (response.input === 'help') {
      let message = `${c.underline.bold.cyan('Help Menu')}\n`
      for (let item in main.aCmd) {
        const cmd = new main.aCmd[item]()
        message += `\n${c.red(cmd.name)} - ${cmd.description}`
      }
      console.log(message)
    } else {
      try {
        const command = response.input.toLowerCase()
        for (let item in main.aCmd) {
          const cmd = new main.aCmd[item]()
          if (!(command === cmd.name) && !(cmd.aliases.indexOf(command) >= 0) && main.aCmd.indexOf(item) === Object(main.aCmd).keys.length - 1) throw new Error()
          else {
            try {
              cmd.execute()
            } catch (err) {
              console.log(c.red('There was an error!\n\n') + c.cyan(err))
            }
          }
        }
      } catch (err) {
        console.log(c.red('Invalid command!'))
      }
    }
  }
  getInput()
}

getInput()
