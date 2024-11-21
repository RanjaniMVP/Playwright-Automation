// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { ALL } = require('dns');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  
  reporter: 'html',
  timeout:60*1000,
  expect:{
    timeout:6000
  },
  
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure'
  }
});

