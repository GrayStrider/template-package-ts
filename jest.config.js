const tsconfig = require('./tsconfig')
const pkg = require('./package.json')
const baseConfig = require('./../../jest.config.base')
module.exports = {
	...baseConfig(tsconfig, pkg),
}
