const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Directories to check
const htmlDir = './';
const assetDirs = {
  'script': ['js'],
  'link': ['css'],
  'img': ['images', 'img']
};

function checkFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(html);
  const brokenLinks = [];

  $('script[src], link[rel="stylesheet"], img[src]').each((_, elem) => {
    const tag = elem.name;
    const srcAttr = $(elem).attr(tag === 'link' ? 'href' : 'src');
    const resolvedPath = path.resolve(path.dirname(filePath), srcAttr);

    if (!fs.existsSync(resolvedPath)) {
      brokenLinks.push({ tag, srcAttr });
    }
  });

  if (brokenLinks.length > 0) {
    console.log(`🚨 Issues in: ${filePath}`);
    brokenLinks.forEach(({ tag, srcAttr }) => {
      console.log(`❌ <${tag}> missing: ${srcAttr}`);
    });
  } else {
    console.log(`✅ All links valid in: ${filePath}`);
  }
}

// Loop through all HTML files
function runAudit() {
  const files = fs.readdirSync(htmlDir);
  files.filter(f => f.endsWith('.html')).forEach(f => checkFile(path.join(htmlDir, f)));

  // Also dive into subfolders like /component/
  if (fs.existsSync('./component')) {
    const subfiles = fs.readdirSync('./component');
    subfiles.filter(f => f.endsWith('.html')).forEach(f => checkFile(path.join('./component', f)));
  }
  if (fs.existsSync('./electronics-advisor')) {
    const subfiles = fs.readdirSync('./electronics-advisor');
    subfiles.filter(f => f.endsWith('.html')).forEach(f => checkFile(path.join('./electronics-advisor', f)));
  }
}

runAudit();