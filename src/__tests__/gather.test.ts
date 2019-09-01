import * as lighthouse from 'lighthouse/lighthouse-core';
import * as chromeLauncher from 'chrome-launcher';
import * as puppeteer from 'puppeteer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ResourceContentMd5 = require('@/gatherers/resource-content-md5');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ResourceContentMd5Audit = require('@/audits/resource-content-md5');

const CHROME_PATH = puppeteer.executablePath();


describe('Gather:MD5', () => {

  it('# should get resources content with md5 from network record', async (done) => {
    const launchOptions = {
      chromePath: CHROME_PATH,
      chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
    };
    const CHROME_INSTANCE = await chromeLauncher.launch(launchOptions);
    const shutdownChrome = async () => {
      await CHROME_INSTANCE.kill();
    };

    const STABLE_URL = 'https://www.baidu.com/';
    const configJson = {
      passes: [
        {
          passName: 'defaultPass',
          gatherers: [ResourceContentMd5]
        }
      ],
      audits: [ResourceContentMd5Audit]
    };

    const lighthouseOptions = {
      port: CHROME_INSTANCE.port
    };

    const result = await lighthouse(STABLE_URL, lighthouseOptions, configJson);
    const artifacts = result.artifacts;
    const lhr = result.lhr;

    expect(artifacts).toHaveProperty('ResourceContentMd5');
    expect(lhr.audits).toHaveProperty('resource-content-md5');

    await shutdownChrome();
    done();
  }, 10000);
});
