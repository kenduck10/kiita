const withInterceptStdout = require('next-intercept-stdout');
const nextConfig = withInterceptStdout({}, (text) => (text.includes('Duplicate atom key') ? '' : text));

module.exports = nextConfig;
