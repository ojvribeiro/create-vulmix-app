#!/usr/bin/env node
const chalk = require('chalk')
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const pkg = require('../package.json')

console.log(
  chalk.cyan(`\n\ncreate-vulmix-app@${pkg.version}\n\n`,
  `Installing vulmix-starter-template...\n\n`)
)

if (process.argv.length < 3) {
  console.log(
    chalk.yellow(`

    ⚠️ You have to provide a name to your app.

    For example:

        npx create-vulmix-app my-app

    `)
  )

  process.exit(1)
}

const projectName = process.argv[2]
const isBeta = process.argv[3] === '--beta' ? true : false
const currentPath = process.cwd()
const projectPath =
  projectName === '.' ? '.' : path.join(currentPath, projectName)
const git_repo = `ojvribeiro/vulmix-starter-template`

try {
  if (projectPath !== '.') fs.mkdirSync(projectPath)
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(
      chalk.yellow(`

    ⚠️ The folder "${projectName}" already exists in the current directory.

      `)
    )
  } else {
    console.log(chalk.red(err))
  }
  process.exit(1)
}

async function main() {
  try {
    console.log(chalk.cyan('\n\n📥 Downloading Vulmix...\n\n'))

    execSync(
      `npx giget@latest gh:${git_repo}${isBeta ? '#dev' : ''} "${projectPath}"`
    )

    process.chdir(projectPath)

    console.log(chalk.green('\n\n✔️ Download complete!\n\n'))

    console.log(chalk.cyan('\n\n🗑️ Cleaning up...\n\n'))
    execSync(
      'npx rimraf ./.git ./.github ./.prettierrc ./.editorconfig ./README.md'
    )

    console.log(chalk.green('\n\n💚 Thanks for using Vulmix!\n\n'))

    console.log(
      chalk.cyan(`
    Next steps:

    ${
      projectName !== '.'
        ?
    `➜ ${
      chalk.white(
        `cd ${projectName}`
      )}`
        : ''
    }
    ➜ ${chalk.white(`npm install`)}     or      ${chalk.white(
    `yarn install`
    )}
    ➜ ${chalk.white(`npm run dev`)}     or      ${chalk.white(`yarn dev`)}


    To generate a deploy-ready SPA:

    ➜ ${chalk.white(`npm run prod`)}     or      ${chalk.white(`yarn prod`)}


      `)
    )
  } catch (error) {
    console.log(chalk.red(error))
  }
}
main()

