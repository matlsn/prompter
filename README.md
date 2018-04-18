# Prompter (WIP)

Simple, easy-to-use framework for CLI-looping applications.

### Installation

Clone this repository and install [Node](https://nodejs.org/en/).

Execute `npm install` to obtain dependencies.

Take a look at **`./commands/plugins/ping.js`** for a sample plugin.

### Utilities (for usage in `execute () {}` inside plugins)

**`this.log('content', 'color')`** - Logs content to console with optional color (provided by [Chalk](https://www.npmjs.com/package/chalk))
