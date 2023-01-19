#!/usr/bin/env node
const chalk = require('chalk')
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const pkg = require('../package.json')

console.log(chalk.cyan(`\n\ncreate-vulmix-app@${pkg.version}`))

if (process.argv.length < 3) {
  console.log(
    chalk.yellow(`

⚠️ You have to provide a name to your app.

For example:

    npx create-vulmix-app ${chalk.whiteBright(`my-app`)}

    `)
  )

  process.exit(1)
}

const projectName = process.argv[2]
const isBeta = process.argv[3] === '--beta' ? true : false
const currentPath = process.cwd()
const projectPath =
  projectName === '.' ? '.' : path.join(currentPath, projectName)
const gitRepo = `ojvribeiro/vulmix-starter-template`

try {
  if (projectPath !== '.') fs.mkdirSync(projectPath)
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(
      chalk.yellow(`

⚠️ The folder "${projectName}" already exists in the current directory. Please, try a diferent name.
    `)
    )
  } else {
    console.log(chalk.red(err))
  }
  process.exit(1)
}

async function main() {
  try {
    console.log(chalk.cyan('\n\n📥 Downloading Vulmix...'))

    execSync(
      `npx giget@latest gh:${gitRepo}${isBeta ? '#dev' : ''} "${projectPath}"`
    )

    process.chdir(projectPath)

    console.log(chalk.green(`

✔️ Download complete!

💚 Thanks for using ${chalk.greenBright(`Vulmix`)}!

`))

    console.log(
      chalk.cyan(`
Next steps:

    ${projectName !== '.' ? `➜ ${chalk.white(`cd ${chalk.whiteBright(projectName)}`)}` : ''}
    ➜ ${chalk.white(`npm install`)}     or      ${chalk.white(`yarn install`)}
    ➜ ${chalk.white(`npm run dev`)}     or      ${chalk.white(`yarn dev`)}


    To generate a deploy-ready SPA:

    ➜ ${chalk.white(`npm run prod`)}     or      ${chalk.white(`yarn prod`)}

    Then you can use the \`_dist\` folder content in any static host.

      `)
    )
  } catch (error) {
    console.log(chalk.red(error))
  }
}
main()
