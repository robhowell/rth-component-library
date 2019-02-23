const path = require('path');

const gitCloneRepo = require('./gitCloneRepo');
const { Parser } = require('acorn');
const { readdir, readFile, lstat } = require('./fs');
const { TMP_DIRECTORY } = require('./config');

const JsxParser = Parser.extend(require('acorn-jsx')());
const parseJsxModule = content =>
  JsxParser.parse(content, { ecmaVersion: 10, sourceType: 'module' });

const isImportOfModule = moduleName => node =>
  node.type === 'ImportDeclaration' && node.source.value === moduleName;

const getNamedImports = importNodes =>
  importNodes
    .reduce((prev, importNode) => {
      return [
        ...prev,
        importNode.specifiers
          .filter(node => node.type === 'ImportSpecifier')
          .reduce((prev, specifier) => [...prev, specifier.imported.name], [])
      ];
    }, [])
    .flat(100);

const getSourceFilename = localFilename =>
  localFilename.replace(`${TMP_DIRECTORY.replace('./', '')}/`, '');

async function searchFilesInDirectoryAsync(dir, moduleName, ext) {
  try {
    await readdir(dir);
  } catch (err) {
    throw new Error(err.message);
  }

  const allFiles = await getFilesInDirectoryAsync(dir, ext);

  return allFiles.reduce(async (prevPromise, localFilename) => {
    const prev = await prevPromise;
    const fileContent = await readFile(localFilename);
    const regex = new RegExp(moduleName);

    if (regex.test(fileContent)) {
      const fileAst = parseJsxModule(fileContent);
      const importsOfTargetModule = fileAst.body.filter(
        isImportOfModule(moduleName)
      );

      if (importsOfTargetModule.length) {
        const filename = getSourceFilename(localFilename);
        const namedImports = getNamedImports(importsOfTargetModule);

        return [
          ...prev,
          {
            filename,
            namedImports
          }
        ];
      }
    }

    return prev;
  }, Promise.resolve([]));
}

// Using recursion, we find every file with the desired extention
async function getFilesInDirectoryAsync(dir, ext) {
  let files = [];
  const filesFromDirectory = await readdir(dir).catch(err => {
    throw new Error(err.message);
  });

  for (const file of filesFromDirectory) {
    const filePath = path.join(dir, file);
    const stat = await lstat(filePath);

    if (stat.isDirectory()) {
      const nestedFiles = await getFilesInDirectoryAsync(filePath, ext);
      files = files.concat(nestedFiles);
    } else {
      if (path.extname(file) === ext) {
        files.push(filePath);
      }
    }
  }

  return files;
}

const main = async () => {
  const targetGitRepo = 'git+https://github.com/robhowell/rth-ui-app.git';

  await gitCloneRepo(targetGitRepo);

  const filesFound = await searchFilesInDirectoryAsync(
    TMP_DIRECTORY,
    '@rth/component-library',
    '.js'
  );

  console.log(filesFound);
};

main();
