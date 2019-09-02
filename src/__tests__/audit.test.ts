import * as _ from 'lodash';
import * as path from 'path';
import * as Config from 'lighthouse/lighthouse-core/config/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ResourceContentMd5Audit = require('@/audits/resource-content-md5');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ResourceContentMd5Gatherer = require('@/gatherers/resource-content-md5');

describe('Audit: MD5', () => {
  it('# should load audit via spec instance', () => {
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
      ],
      audits: [ResourceContentMd5Audit]
    };

    const defaultConfig = new Config(baseConfigJson);
    const injectedConfig = new Config(allConfigJson);

    expect(Object.keys(injectedConfig.audits).length).toBeGreaterThan(Object.keys(defaultConfig.audits).length);
  });

  it('# should load audit via path', () => {
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
          gatherers: [ResourceContentMd5Gatherer]
        }
      ],
      audits: [
        {
          path: resolve('lib/audits/resource-content-md5')
        }
      ]
    };

    const defaultConfig = new Config(baseConfigJson);
    const injectedConfig = new Config(allConfigJson);

    expect(Object.keys(injectedConfig.audits).length).toBeGreaterThan(Object.keys(defaultConfig.audits).length);
  });

  it('# should execute audit function with fake requiredArtifacts[`ResourceContentMd5`]', async (done) => {
    const resourceContentsWithMd5 = [
      {
        requestId: 'some-request-id',
        url: 'http://example.com/some-pic.png',
        md5: 'some-md5-content'
      },
      {
        requestId: 'other-request-id',
        url: 'http://example.com/some-font.ttf',
        md5: 'some-md5-content'
      }
    ];

    const auditResult = await ResourceContentMd5Audit.audit({ ResourceContentMd5: resourceContentsWithMd5 }, {});
    expect(auditResult).toMatchSnapshot();
    done();
  });
});
