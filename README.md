<p align="center">
  <img src="https://i.imgur.com/mW6kpyK.png" />
</p>

# Prompter (WIP)

Simple, easy-to-use framework for looping CLI applications.

### Installation

Clone this repository and install [Node](https://nodejs.org/en/).

Execute `npm install` to obtain dependencies and `node index` to start.

Take a look at **`./commands/plugins/ping.js`** for a sample plugin.

### Utilities (for usage in `execute () {}` inside plugins)

**`this.log('content', 'color')`** - Logs content to console with optional color (provided by [Chalk](https://www.npmjs.com/package/chalk)). Compatable with arrays for cleaner multi-logging.
