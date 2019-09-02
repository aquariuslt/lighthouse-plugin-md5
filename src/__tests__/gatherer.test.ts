import * as _ from 'lodash';
import * as path from 'path';
import * as Config from 'lighthouse/lighthouse-core/config/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ResourceContentMd5Gatherer = require('@/gatherers/resource-content-md5');

describe('Gatherer:MD5', () => {
  it('# should load gatherer via spec instance', () => {
    const baseConfigJson = {
      extends: 'lighthouse:default'
    };

    const allConfigJson = {
      ...baseConfigJson,
      passes: [
        {
          passName: 'defaultPass',
          gatherers: [ResourceContentMd5Gatherer]
        }
      ]
    };

    const defaultConfig = new Config(baseConfigJson);
    const injectedConfig = new Config(allConfigJson);

    expect(_.head(injectedConfig.passes).gatherers.length).toBeGreaterThan(
      _.head(defaultConfig.passes).gatherers.length
    );
  });

  it('# should load gatherer via relative path and config-path', () => {
    function resolve(loc: string): string {
      return path.join(__dirname, '../..', loc);
    }

    const baseConfigJson = {
      extends: 'lighthouse:default'
    };

    const allConfigJson = {
      ...baseConfigJson,
      passes: [
        {
          passName: 'defaultPass',
          gatherers: [{ path: resolve('lib/gatherers/resource-content-md5') }]
        }
      ]
    };

    const configPathFlags = {
      configPath: resolve('')
    };

    const defaultConfig = new Config(baseConfigJson);
    const injectedConfig = new Config(allConfigJson, configPathFlags);

    expect(_.head(injectedConfig.passes).gatherers.length).toBeGreaterThan(
      _.head(defaultConfig.passes).gatherers.length
    );
  });

  it('# should execute gatherer pass function with fakeDriver', async (done) => {
    const fakeDriver = {
      getRequestContent: (record?) => {
        return Promise.resolve(`some content`);
      }
    };

    const fakeNetworkRecords = [
      {
        requestId: 'fakeRequestId',
        resourceType: 'Image',
        url: 'http://example.com/some-pic.png'
      }
    ];

    const mappings = await new ResourceContentMd5Gatherer().afterPass(
      { driver: fakeDriver },
      { networkRecords: fakeNetworkRecords }
    );

    expect(mappings).toHaveLength(fakeNetworkRecords.length);
    done();
  });
});
