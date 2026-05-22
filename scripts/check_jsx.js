const fs = require('fs');
const path = require('path');

const file = process.argv[2] || path.join('src','components','sections','About.jsx');
const fullPath = path.resolve(file);
let src;
try {
  src = fs.readFileSync(fullPath, 'utf8');
} catch (e) {
  console.error('Failed to read', fullPath, e.message);
  process.exit(1);
}

const tagRegex = /<\/?([A-Za-z0-9_:\-\.]+)([^>]*)>/g;
let match;
const stack = [];

function lineAt(idx) {
  return src.slice(0, idx).split('\n').length;
}

while ((match = tagRegex.exec(src)) !== null) {
  const raw = match[0];
  const name = match[1];
  const attrs = match[2] || '';
  const idx = match.index;
  const line = lineAt(idx);

  const isClosing = raw.startsWith('</');
  const isSelfClosing = /\/\s*>$/.test(raw);

  if (isClosing) {
    if (stack.length === 0) {
      console.error(`Unmatched closing </${name}> at line ${line}`);
    } else {
      const top = stack[stack.length - 1];
      if (top.name.toLowerCase() === name.toLowerCase()) {
        stack.pop();
      } else {
        console.error(`Tag mismatch: expected </${top.name}> (opened at line ${top.line}) but found </${name}> at line ${line}`);
      }
    }
  } else if (!isSelfClosing) {
    // push opening tag
    stack.push({ name, line });
  }
}

if (stack.length) {
  console.error('Unclosed tags:');
  stack.forEach((t) => console.error(`${t.name} opened at line ${t.line}`));
  process.exit(2);
}

console.log('No tag mismatches found.');
process.exit(0);
