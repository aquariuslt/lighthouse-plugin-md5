import * as lighthouse from 'lighthouse';

import * as NetworkRecords from 'lighthouse/lighthouse-core/computed/network-records';

const Audit = lighthouse.Audit;

export = class ResourceContentMd5Audit extends Audit {
  static get meta() {
    return {
      id: 'resource-content-md5',
      title: 'Resource Content MD5',
      description: 'Resource Content with MD5 Validation',
      failureTitle: 'Content MD5 can not be detect',
      requiredArtifacts: ['devtoolsLogs', 'ResourceContentMd5']
    };
  }

  static async audit(artifacts, context) {
    const devtoolsLog = artifacts.devtoolsLogs[Audit.DEFAULT_PASS];
    const resourceContents = artifacts.ResourceContentMd5;

    const networkRecords = await NetworkRecords.request(devtoolsLog, context);

    return {};
  }
};
