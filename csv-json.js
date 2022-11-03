#! /usr/bin/env node

const {program} = require('commander')


const process = require('./parser')

const prompt = require('prompt-sync')()

program.command('process')
        .description('appends sha256 hash of row to each row, and returns json file with hashes and ammended csv file')
        .action(
            // enter functionality here
            ()=>{
                const fileUrl = prompt('enter local file location url: ')
                
                process(fileUrl)
            }
            )

program.parse()