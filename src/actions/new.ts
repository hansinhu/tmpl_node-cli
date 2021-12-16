import prompts from 'prompts'


const typeList = [
  { title: 'component', value: 'component', description: '前端组件库 项目' },
  { title: 'library', value: 'library', description: '前端组件库 项目' },
  { title: 'web', value: 'web', description: 'Web 项目' },
  { title: 'node', value: 'node', description: 'Node 项目' },
]

function validateType (type: string) {
	return typeList.some(item => item.value === type)
}


interface ProectArgs {
	type: string;
	name: string;
}

async function newProject ({ type, name }:ProectArgs) {
	if (!type || !validateType(type)) {
		const typeRes = await prompts({
			type: 'select',
      name: 'type',
      message: 'Pick project type: ',
      choices: typeList,
		})

		console.log('typeRes', typeRes)
	}

	// TODO: validate name 如果项目名称校验不通过，给出提示
	if (!name) {
    console.log('Please input the project name (项目名称):')
    const nameRes = await prompts({
      type: 'text',
      name: 'name',
      message: 'What is your project name?',
      initial: 'my_app',
      validate: name => {
				return true
        // TODO: 名称再次校验
        // const validation = helpers.validateAppName(path.basename(path.resolve(name)))
        // if (validation.valid) {
        //   return true
        // }
        // return 'Invalid project name: ' + validation.problems[0] || ''
      },
    })

    console.log('nameRes', nameRes)
  }
}

export {
	newProject
}