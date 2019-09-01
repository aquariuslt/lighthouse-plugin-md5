const plugin = {
  audits: [{ path: 'lib/audit.js' }],
  category: {
    title: 'MD5 Validation',
    auditRefs: [{ id: 'content-md5', weight: 0 }]
  }
};

export = plugin;
