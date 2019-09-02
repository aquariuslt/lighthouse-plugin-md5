import * as path from 'path';

function resolve(loc: string): string {
  return path.join(__dirname, './', loc);
}

const plugin = {
  audits: [{ path: resolve('audits/resource-content-md5') }],
  category: {
    title: 'Resource Content MD5',
    auditRefs: [{ id: 'resource-content-md5', weight: 0 }]
  }
};

export = plugin;
