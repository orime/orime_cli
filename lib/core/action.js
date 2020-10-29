const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const open = require('open')
const path = require('path')
const colors = require('colors')
const readline = require('readline')

const { vueRepo } = require('../config/repo-config');
const { commandSpawn } = require('../utils/terminal');
const { compile, writeToFile, createDirSync } = require('../utils/utils'); // 编译ejs模板

const unloadChar = '-';
const loadedChar = '=';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function renderProgress(text, step) {
  const PERCENT = Math.round(step * 10);
  const COUNT = 2;
  const unloadStr = new Array(COUNT * (10 - step)).fill(unloadChar).join('');
  const loadedStr = new Array(COUNT * (step)).fill(loadedChar).join('');
  process.stdout.write(`${text}:【${loadedStr}${unloadStr}|${PERCENT}%】`)
}


/** 创建项目的action */
const createProjectAction = async (project) => {
  console.log("why helps you create your project~")



  // 1.clone项目
  await download(vueRepo, project, { clone: true });

  // 2.执行npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  await commandSpawn(command, ['install'], { cwd: `./${project}` })

  // 3.运行npm run serve
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` });

  // 4.打开浏览器
  open("http://localhost:8080/");
}

/** 添加组件的action */
const addCpnAction = async (name, dest) => {
  // 1、编译ejs模板
  const result = await compile('vue-component.ejs', { name, lowerName: name.toLocaleLowerCase() })
  // 2、将result写入到.vue文件中
  if (createDirSync(dest)) {
    const targetPath = path.resolve(dest, `${name}.vue`)
    writeToFile(targetPath, result)
  }
}

/** 添加页面和路由 */
const addPageAndRouter = async (page, dest) => {
  // 1.编译ejs模板
  const data = { page, lowerName: page.toLocaleLowerCase() }
  const pageResult = await compile('vue-component.ejs', data)
  const routeResult = await compile('vue-router.ejs', data)
  // 2.获取目标路径
  const newDest = path.join(dest, page.toLocaleLowerCase())
  if (createDirSync(newDest)) {
    const targetPagePath = path.resolve(newDest, `${page}.vue`)
    const targetRouterPath = path.resolve(newDest, `router.js`)
    writeToFile(targetPagePath, pageResult)
    writeToFile(targetRouterPath, routeResult)
  }
}

/** 代码着色测试 */
const sayHelloAction = async (name) => {
console.log('hello'.green); // outputs green text
console.log('i like cake and pies'.underline.red); // outputs red underlined text
console.log('inverse the color'.inverse); // inverses the color
console.log('OMG Rainbows!'.rainbow); // rainbow
console.log('Run the trap'.trap); // Drops the bass
  return
}

module.exports = {
  createProjectAction,
  addCpnAction,
  addPageAndRouter,
  sayHelloAction,
}