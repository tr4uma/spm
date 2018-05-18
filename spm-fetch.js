#!/usr/bin/env node

const program = require('commander')
const fs = require('fs');
const gitane = require('gitane')
const path = require('path')
const _ = require('lodash')

program
  .option('-f, --filename <filename>', 'Specify the description file containing all packages')
  .option('-r, --repoconfig <repoconfig>', 'Specify the description file containing all packages')
  .parse(process.argv)

//Reading dependencies
let configFilename = program.filename === undefined ? './spm-package.json' : program.filename
let fetchConfig = JSON.parse(fs.readFileSync(configFilename, 'utf8'))

//Looking into default configuration file if none was specified
let repoFilename = program.repoconfig === undefined ? __dirname + '/spm-repository-default.json' : program.repoconfig
let repoConfig = JSON.parse(fs.readFileSync(repoFilename, 'utf8'))

let dependencies = repoConfig.repositories

// Use current working dir
const baseDir = process.cwd()+'/temp/dependencies/'

console.log(baseDir)
// Read private key from ~/.ssh/id_dsa
let privKey = fs.readFileSync(path.join(process.env.HOME, '.ssh/id_dsa'), 'utf8')

gitane.run(baseDir, privKey, 'git clone ' + getRepositoryPlatformBaseUrl('bitbucket') + 'telnextalldevs/apex-utils.git',
	function(err, stdout, stderr, exitCode) {
  	if (err) {
  	  console.log('An error occurred: ' + stderr)
  	  //process.exit(1)
  	}
  console.log("Git clone complete!")
})

function getRepositoryPlatformBaseUrl(repositoryPlatform) {
  switch(repositoryPlatform) {
    case 'bitbucket': default:
      return 'git@bitbucket.org:'
  }
}