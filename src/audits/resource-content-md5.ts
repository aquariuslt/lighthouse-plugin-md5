import * as lighthouse from 'lighthouse';

const Audit = lighthouse.Audit;

export = class ResourceContentMd5Audit extends Audit {
  static get meta() {
    return {
      id: 'resource-content-md5',
      title: 'Resource Content MD5',
      description: 'Resource Content with MD5 Validation',
      failureTitle: 'Content MD5 cannot be detect',
      requiredArtifacts: ['devtoolsLogs', 'ResourceContentMd5']
    };
  }

  static async audit(artifacts, context) {
    const resourceContents = artifacts.ResourceContentMd5;

    const results = resourceContents.map((resource) => ({
      url: resource.url,
      md5: resource.md5
    }));

    const headings = [{ key: 'url', itemType: 'url', text: 'URL' }, { key: 'md5', itemType: 'string', text: 'MD5' }];
    const tableDetails = Audit.makeTableDetails(headings, results);

    return {
      score: 1,
      numericValue: resourceContents.length,
      details: tableDetails
    };
  }
};
