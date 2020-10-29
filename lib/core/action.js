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

/** 讲个彩色的笑话 */
const spitOutJokeAction = async () => {
  console.log('彩色笑话即将登场'.rainbow); // outputs green text
  console.log('i like cake and pies'.underline.red); // outputs red underlined text
  console.log('inverse the color'.inverse); // inverses the color
  /** 接口地址
  https://way.jd.com/showapi/wbxh?time=2015-07-10&page=1&maxResult=20&showapi_sign=bd0592992b4d4050bfc927fe7a4db9f3&appkey=88d92df03d28adaaa8c0e8a49ea711b6
   */
  console.log('1、问：“有没有那么一瞬间，让你觉得如果能一直这样下去多好…”回复：“ATM机出钱的时候！2、宿舍里有一个姐们。同学问她：“如果你的男朋友什么都没有了，你还会爱他吗？”姐们的回答是：“还有呼吸吗？”3、某日深夜，在男生宿舍，一声巨响惊醒了一屋子人。原来是上铺一位猛男自高处摔下，且头部撞在了桌子上。众人皆用关切的目光看着他。只见他摸了摸脑袋问道：刚才那么大声，是谁掉下来了，没事吧？4、寝室有一同学去厕所，玩手机不小心把手机掉下去了。。。然后，就回去拿了双筷子准备夹出来，正当此同学要下筷子捞时，厕所进来一哥们，看到此景，关心得问道：“哥们，还没吃呢？”5、女生不会做饭的话会出现什么情况呢？将来你的孩子长大后会说：好怀念小时候妈妈给我叫的外卖！'.green); // rainbow
  console.log('笑话讲完了'.red);
  
  return
}

module.exports = {
  createProjectAction,
  addCpnAction,
  addPageAndRouter,
  sayHelloAction,
  spitOutJokeAction,
}