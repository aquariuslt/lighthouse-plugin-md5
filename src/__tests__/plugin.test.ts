import * as path from 'path';
import * as Config from 'lighthouse/lighthouse-core/config/config';

describe('Plugin: Discovery', () => {
  it('# should load plugin with module identifier', () => {
    const baseConfigJson = {
      extends: 'lighthouse:default'
    };

    const allConfigJson = {
      ...baseConfigJson,
      plugins: ['lighthouse-plugin-md5'],
      passes: [
        {
          passName: 'defaultPass',
          gatherers: ['lib/gatherers/resource-content-md5.js']
        }
      ]
    };

    const configPathFlags = {
      configPath: path.resolve(__dirname + '/../../')
    };

    const lighthouseConfig = new Config(allConfigJson, configPathFlags);
    expect(lighthouseConfig.categories).toHaveProperty('lighthouse-plugin-md5');
  });

  it('# should load plugin with source code', () => {
    const baseConfigJson = {
      extends: 'lighthouse:default'
    };

    const allConfigJson = {
      ...baseConfigJson,
      plugins: ['lighthouse-plugin-md5'],
      passes: [
        {
          passName: 'defaultPass',
          gatherers: ['lib/gatherers/resource-content-md5.js']
        }
      ]
    };

    const configPathFlags = {
      configPath: path.resolve(__dirname + '/__fixtures__/lighthouse-plugin-md5')
    };

    const lighthouseConfig = new Config(allConfigJson, configPathFlags);
    expect(lighthouseConfig.categories).toHaveProperty('lighthouse-plugin-md5');
  });
});
