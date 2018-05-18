#!/usr/bin/env node

'use strict'
const program = require('commander')

program
	.version('0.0.1')
	.command('fetch','Parse configuration file and downloads all project dependencies')
	.parse(process.argv)
