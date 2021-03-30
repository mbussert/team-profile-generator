// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js");

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    message: "Please enter your GitHub username:",
    name: "userName",
  },
  {
    type: "input",
    message: "Please enter your email address:",
    name: "userEmail",
  },
  {
    type: "input",
    message: "What is the title of your project?",
    name: "projectTitle",
  },
  {
    type: "input",
    message: "Please enter a description of your project:",
    name: "projectDescription",
  },
  {
    type: "input",
    message: "Please describe how your project is to be used:",
    name: "projectUsage",
  },
  {
    type: "input",
    message: "Please describe how your project is to be installed:",
    name: "projectInstall",
  },
  {
    type: "list",
    message: "What type of license is applicable to your project?",
    choices: ["GNU GPLv3", "MIT", "Apache", "ISC", "No License"],
    name: "license",
  },
  {
    type: "input",
    message: "Please enter any contribution guidelines:",
    name: "contribution",
  },
  {
    type: "input",
    message: "Please enter any test instructions:",
    name: "testInstructions",
  },
];

// TODO: Create a function to write README file
function writeToFile(fileName, generateMarkdown) {
  fs.writeFile(fileName, generateMarkdown, (err) =>
    err ? console.error(err) : console.log(`${fileName} built successfully!`)
  );
}

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questions).then((response) => {
    const fileName = `${response.projectTitle}.md`;
    const responseData = { ...response };
    const formatData = generateMarkdown(responseData);
    writeToFile(fileName, formatData);
  });
}

// Function call to initialize app
init();
