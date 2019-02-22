const rmfr = require('rmfr');
const Git = require('nodegit');
const { TMP_DIRECTORY } = require('./config');

const normalizeGitAddress = url => url.replace(/git\+/g, '');

const gitCloneRepo = async repoUrl => {
  await rmfr(TMP_DIRECTORY);
  await Git.Clone(normalizeGitAddress(repoUrl), TMP_DIRECTORY);
  console.log(`Cloned repo '${repoUrl}'`);
};

module.exports = gitCloneRepo;
