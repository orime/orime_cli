const program = require('commander')

const { createProjectAction, addCpnAction, addPageAndRouter, sayHelloAction, spitOutJokeAction } = require('./action')

const createCommands = () => {
  // 创建项目
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createProjectAction)
  // 创建组件
  program
    .command('addCpn <name> [others...]')
    .description('add a component to your project')
    .action((name) => addCpnAction(name, program.dest || 'src/components'))

  // 创建page页面及路由router
  program
    .command('addPage <page>')
    .description('add a page to your project')
    .action((page) => addPageAndRouter(page, program.dest || `src/pages`))

  // 代码着色交互测试
  program
    .command('sayHello <name>')
    .description('say hello to someone you assign')
    .action((name) => sayHelloAction(name))

  // 讲个彩色笑话
  program
    .command('joke')
    .description('讲一个彩色的笑话')
    .action(() => spitOutJokeAction())
}

module.exports = createCommands