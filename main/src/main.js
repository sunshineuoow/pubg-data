const serve = process.defaultApp;
if (serve) {
    require('ts-node').register();
    require('.');
} else {
    throw new Error('你不应该在生产环境看到这个');
}
