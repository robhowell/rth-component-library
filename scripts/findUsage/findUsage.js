const path = require('path');

const gitCloneRepo = require('./gitCloneRepo');
const { readdir, readFile, lstat } = require('./fs');
const { TMP_DIRECTORY } = require('./config');

async function searchFilesInDirectoryAsync(dir, filter, ext) {
  try {
    await readdir(dir);
  } catch (err) {
    throw new Error(err.message);
  }

  const allFiles = await getFilesInDirectoryAsync(dir, ext);

  return allFiles.reduce(async (prevPromise, file) => {
    const prev = await prevPromise;
    const fileContent = await readFile(file);
    const regex = new RegExp(filter);

    if (regex.test(fileContent)) {
      return [...prev, file];
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
    new RegExp('@rth/component-library'),
    '.js'
  );

  console.log(JSON.stringify(filesFound));
};

main();
