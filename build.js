const { minify } = require('terser');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src', 'anchorClick.js');
const SRC_TYPES = path.join(__dirname, 'src', 'anchorClick.d.ts');
const DIST = path.join(__dirname, 'dist');

async function build() {
  // Ensure dist/ exists
  if (!fs.existsSync(DIST)) {
    fs.mkdirSync(DIST);
  }

  const source = fs.readFileSync(SRC, 'utf8');

  // Copy source to dist/
  fs.writeFileSync(path.join(DIST, 'anchorClick.js'), source);
  console.log(`dist/anchorClick.js: ${source.length} bytes`);

  // Copy types to dist/
  const types = fs.readFileSync(SRC_TYPES, 'utf8');
  fs.writeFileSync(path.join(DIST, 'anchorClick.d.ts'), types);
  console.log(`dist/anchorClick.d.ts: ${types.length} bytes`);

  // ESM build — extract the factory function from the UMD wrapper
  const factoryStart = source.indexOf(', function (window) {') + 2;
  const factoryEnd = source.lastIndexOf('\n});');
  const factory = source.slice(factoryStart, factoryEnd).trimEnd();
  const esmSource = [
    'var anchorClick = (' + factory + ')(typeof globalThis !== \'undefined\' ? globalThis : typeof window !== \'undefined\' ? window : this);',
    '',
    'export default anchorClick;',
    ''
  ].join('\n');
  fs.writeFileSync(path.join(DIST, 'anchorClick.esm.js'), esmSource);
  console.log(`dist/anchorClick.esm.js: ${esmSource.length} bytes`);

  // Minified build
  const minified = await minify(source, {
    compress: { passes: 2 },
    mangle: true,
    output: { comments: false },
    sourceMap: {
      filename: 'anchorClick.min.js',
      url: 'anchorClick.min.js.map'
    }
  });
  fs.writeFileSync(path.join(DIST, 'anchorClick.min.js'), minified.code);
  fs.writeFileSync(path.join(DIST, 'anchorClick.min.js.map'), minified.map);
  console.log(`dist/anchorClick.min.js: ${minified.code.length} bytes`);
  console.log(`dist/anchorClick.min.js.map: ${minified.map.length} bytes`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
