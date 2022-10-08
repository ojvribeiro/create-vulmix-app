#!/usr/bin/env node

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const package = require('../package.json')

console.log(
  // Cyan
  '\x1b[36m%s\x1b[0m',
  `\n\ncreate-vulmix-app@${package.version}\n\n`,
  `Installing vulmix-starter-template...\n\n`
)

if (process.argv.length < 3) {
  console.log(
    // Yellow
    '\x1b[33m%s\x1b[0m',
    `

    ⚠️ You have to provide a name to your app.

    For example:

        npx create-vulmix-app my-app

    `
  )

  process.exit(1)
}

const projectName = process.argv[2]
const isBeta = process.argv[3] === '--beta' ? true : false
const currentPath = process.cwd()
const projectPath = projectName === '.' ? '.' : path.join(currentPath, projectName)
const git_repo = `https://github.com/ojvribeiro/vulmix${isBeta ? '-starter-template' : ''}.git`

try {
  if (projectPath !== '.') fs.mkdirSync(projectPath)
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(
      // Yellow
      '\x1b[33m%s\x1b[0m',
      `

    ⚠️ The folder "${projectName}" already exists in the current directory.

      `
    )
  } else {
    console.log('\x1b[31m%s\x1b[0m', error)
  }
  process.exit(1)
}

async function main() {
  try {
    console.log(
      // Cyan
      '\x1b[36m%s\x1b[0m',
      '\n\n📥 Downloading Vulmix...\n\n'
    )
    execSync(`git clone ${isBeta ? '--branch dev' : ''} ${git_repo} ${projectPath}`)

    process.chdir(projectPath)

    console.log(
      // Green
      '\x1b[32m%s\x1b[0m',
      '\n\n✔️ Download complete!\n\n'
    )

    console.log(
      // Cyan
      '\x1b[36m%s\x1b[0m',
      '\n\n🗑️ Cleaning up...\n\n'
    )
    execSync(
      'npx rimraf ./.git ./.github ./.prettierrc ./.editorconfig ./README.md'
    )

    console.log(
      // Green
      '\x1b[32m%s\x1b[0m',
      '\n\n💚 Thanks for using Vulmix!\n\n'
    )

    console.log(
      // Cyan
      '\x1b[36m%s\x1b[0m',
      `
      Next steps:

      ________________________________________________
        ${projectName !== '.' ?
          `

        📁 cd ${projectName}`
          : ''
        }

        📦 npm install     or      yarn install

        🟢 npm run dev     or      yarn dev

      ________________________________________________




      To generate a deploy-ready SPA:

      ________________________________________________

        🚀 npm run prod     or      yarn prod

      ________________________________________________



      `
    )
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', error)
  }
}
main()
