import prompts from 'prompts'
import { appTypeList, validateAppType, validateAppName } from '../helpers'
import chalk from 'chalk'
import path from 'path'

interface ProectArgs {
	type: string;
	name: string;
  opts?:    Record<string, string>
}

async function newProject ({ type, name, opts }:ProectArgs) {
  let appType = type
  let appName = name

   // 项目类型校验
   const { valid: validType, problems: typeProblems } = validateAppType(appType)
   // 项目名称格式及存在校验:
  const { valid: validName, problems: nameProblems } = validateAppName(appName)

	if (!validType) {
    // 如果项目类型校验不通过，给出提示
    console.log(chalk.yellow(typeProblems.join("\n")))
    console.log(chalk.green('Please specify the project type（项目类型）:'))

		appType = (await prompts({
			type: 'select',
      name: 'type',
      message: 'Pick project type: ',
      choices: appTypeList,
		})).type

	}

	// 如果项目名称校验不通过，给出提示
	if (!validName) {
    // 如果项目类型校验不通过，给出提示
    console.log(chalk.yellow(nameProblems.join("\n")))
    console.log('Please input the project name (项目名称):')
    appName = (await prompts({
      type: 'text',
      name: 'name',
      message: 'What is your project name?',
      initial: 'my_app',
      validate: name => {
        // 名称再次校验
        const validation = validateAppName(path.basename(path.resolve(name)))
        if (validation.valid) {
          return true
        }
        return 'Invalid project name: ' + validation.problems[0] || ''
      },
    })).name
  }

  const appPath = path.resolve(appName)
  console.log()
  console.log(
    `Will Create App:
      ${chalk.cyan('项目类型：')} ${chalk.green(appType)}
      ${chalk.cyan('项目名称：')} ${chalk.green(appName)}
      ${chalk.cyan('项目目录：')} ${chalk.green(appPath)}
    `
  )

  createApp({
    appType,
    appName,
    appPath,
  })
}

function createApp (params: any) {
  console.log(params)
}

export {
	newProject
}