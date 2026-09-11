const fs = require('fs');
const vm = require('vm');

const files = [
  'script.js',
  'src/product-data.js',
  'product.html',
  'product-details.html',
  'buy.html'
];

for (const file of files) {
  let code = '';
  if (file.endsWith('.js')) {
    code = fs.readFileSync(file, 'utf8');
  } else {
    const html = fs.readFileSync(file, 'utf8');
    const matches = [...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)];
    code = matches.map(match => match[1]).join('\n');
  }

  new vm.Script(code);
  console.log('OK', file);
}
