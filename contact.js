#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const {addContact, getContact} = require('./index');

program
    .version('0.0.1')
    .description('Constact management system');

const questions = [
    {
        type:'input',
        name:'firstName',
        message:'Enter Firstname ...'
    },
    {
        type:'input',
        name:'lastName',
        message:'Enter Lastname ...'
    },
    {
        type:'input',
        name:'phone',
        message:'Enter phone number ...'
    },
    {
        type:'input',
        name:'email',
        message:'Enter EmailAddress ...'
    }
];
    

program
    .command('addContact')
    .alias('a')
    .description('Add a contact')
    .action(() => {
        prompt(questions).then(answers => addContact(answers));
    });


program
    .command('getContact <name>')
    .alias('r')
    .description('Get a contact')
    .action(name => getContact(name));


program.parse(process.argv);