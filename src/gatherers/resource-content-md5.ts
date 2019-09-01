import * as _ from 'lodash';
import * as lighthouse from 'lighthouse';
const Gatherer = lighthouse.Gatherer;

import * as NetworkRequest from 'lighthouse/lighthouse-core/lib/network-request';

import * as crypto from 'crypto';

const RESOURCE_TYPES = [
  NetworkRequest.TYPES.Script,
  NetworkRequest.TYPES.Stylesheet,
  NetworkRequest.TYPES.Font,
  NetworkRequest.TYPES.Image
];

const calculateMd5 = (content) => {
  const md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
};

export = class ResourceContentMd5 extends Gatherer {
  async afterPass(passContext, loadData) {
    const driver = passContext.driver;

    const resourceRecords = loadData.networkRecords
      .filter((record) => !record.sessionId)
      .filter((record) => _.includes(RESOURCE_TYPES, record.resourceType));

    const md5Mappings = [];

    for (const record of resourceRecords) {
      try {
        const url = record.url;
        const requestId = record.requestId;
        const content = await driver.getRequestContent(record.requestId);
        const contentMd5 = calculateMd5(content);

        md5Mappings.push({
          requestId,
          url,
          content,
          md5: contentMd5
        });
      } catch (e) {}
    }

    return md5Mappings;
  }
};
