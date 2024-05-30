import baseConfig from '../../jest.config'
import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  ...baseConfig,
  rootDir: '../..',
  displayName: 'massa-web3',
  testMatch: ['<rootDir>/packages/massa-web3/test/**/*.(spec|test).ts?(x)'],
  testPathIgnorePatterns: [
    '<rootDir>/packages/massa-web3/test/open_rpc/publicAPI.spec.ts',
  ],
}

export default config
