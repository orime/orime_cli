const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

/** 编译ejs模板 */
const compile = (template, data) => {
  const templatePosition = `../templates/${template}`
  const templatePath = path.resolve(__dirname, templatePosition)
  return new Promise((res, rej) => {
    ejs.renderFile(templatePath, {data}, {}, (err, result) => {
      if (err) {
        console.log(err);
        rej(err)
      }
      res(result)
    })
  })
}

/** 判断路径是否存在，不存在即创建 */
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true;
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName);
      return true;
    }
  }
}

/** 写入文件 */
const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content)
}

module.exports = {
  compile,
  writeToFile,
  createDirSync,
}