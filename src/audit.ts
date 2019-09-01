import * as lighthouse from 'lighthouse';

const Audit = lighthouse.Audit;

const ALLOW_MD5_RESOURCES_TYPES = new Set(['Font', 'Image', 'Script', 'Stylesheet']);

export = class ContentMd5Audit extends Audit {
  static get meta() {
    return {
      id: 'content-md5',
      title: 'Content MD5 Validation',
      description: 'Content MD5 Validation',
      failureTitle: 'Content MD5 can not be detect',
      requiredArtifacts: ['LinkElements', 'ScriptElements', 'devtoolsLogs']
    };
  }

  static async audit(artifacts, context) {
    return {
      score: 1
    };
  }
};
