const plugin = {
  audits: [{ path: 'lib/audits/resource-content-md5.js' }],
  category: {
    title: 'Resource Content MD5',
    auditRefs: [{ id: 'resource-content-md5', weight: 0 }]
  }
};

export = plugin;
