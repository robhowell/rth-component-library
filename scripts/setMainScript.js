const editJsonFile = require('edit-json-file');
const manifest = require('../dist/assets/manifest.json');

const mainScript = manifest['bundle.js'];
const rootRelativeMainScript = `dist${mainScript}`;
const packageJsonFile = editJsonFile(`${__dirname}/../package.json`);

packageJsonFile.set('main', rootRelativeMainScript);
packageJsonFile.save();
