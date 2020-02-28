const tsconfig = require('./tsconfig')
const pkg = require('./package.json')
const baseConfig = require('@strider/utils-ts/jest.config.base')
module.exports = {
	...baseConfig(tsconfig, pkg),
}
