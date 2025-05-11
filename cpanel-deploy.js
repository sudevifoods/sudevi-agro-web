
const fs = require('fs');
const path = require('path');

// Ensure the build directory exists
if (!fs.existsSync('./dist')) {
  console.error('Build directory does not exist. Please run "npm run build" first.');
  process.exit(1);
}

// Create a robots.txt file if it doesn't exist
if (!fs.existsSync('./dist/robots.txt')) {
  const robotsTxt = `User-agent: *
Allow: /
Sitemap: http://www.sudevifoods.com/sitemap.xml
`;
  fs.writeFileSync('./dist/robots.txt', robotsTxt);
  console.log('Created robots.txt');
}

// Create a sitemap.xml file
const pages = [
  '',
  'about',
  'products',
  'careers',
  'partners',
  'contact',
  'privacy'
];

const domain = 'http://www.sudevifoods.com';
let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

pages.forEach(page => {
  sitemap += '  <url>\n';
  sitemap += `    <loc>${domain}/${page}</loc>\n`;
  sitemap += '    <lastmod>' + new Date().toISOString().split('T')[0] + '</lastmod>\n';
  sitemap += '    <changefreq>monthly</changefreq>\n';
  sitemap += '    <priority>0.8</priority>\n';
  sitemap += '  </url>\n';
});

sitemap += '</urlset>';

fs.writeFileSync('./dist/sitemap.xml', sitemap);
console.log('Created sitemap.xml');

console.log('Files prepared for cPanel deployment.');
console.log('Next steps:');
console.log('1. Upload the contents of the "dist" folder to your cPanel hosting.');
console.log('2. Make sure to point your domain to the server IP: http://185.151.30.188/');
console.log('3. Set the document root to the uploaded directory in cPanel.');
