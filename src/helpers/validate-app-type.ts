
const appTypeList = [
  { title: 'component', value: 'component', description: '前端组件库 项目' },
  { title: 'library', value: 'library', description: '前端类库 项目' },
  { title: 'web', value: 'web', description: 'Web 项目' },
  { title: 'node', value: 'node', description: 'Node 项目' },
  { title: 'cli', value: 'cli', description: 'CLI 项目' },
]

function validateAppType(type: string) {
  if (appTypeList.some(item => item.title === type)) {
    return { valid: true, problems: [] }
  }

  const names = appTypeList.map(item => item.title).join(', ')

  return {
    valid: false,
    problems: [
      `project type should be [ ${names} ]`
    ],
  }
}

export {
  appTypeList,
  validateAppType,
}
