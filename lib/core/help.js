const program = require('commander')

const helpOptions = () => {
  // 自定义options
  program.option('-w --why', 'a why cli')
  program.option('-d --dest <dest>', 'a destination folder, such as -d /src/components')
  program.option('-f --framework <frameword>', 'your framework, such as -f react')

  // 增加-h的提示信息
  program.on('--help', () => {
    console.log('')
    console.log('Other:');
    console.log('  other options');
  })
}

module.exports = helpOptions