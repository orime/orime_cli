#!/usr/bin/env node
const program = require('commander')
const helpOptions = require('./lib/core/help')
const createCommanders = require('./lib/core/create')

// 查看版本号
program.version(require('./package.json').version)
program.version(require('./package.json').version, '-v --version')

// 设置-h自定义options
helpOptions()

// 增加commander自定义指令
createCommanders()

// 注册parse捕捉命令行参数
program.parse(process.argv)
