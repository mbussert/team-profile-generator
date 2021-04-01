let licenseBadge = "";
let licenseLink = "";
let licenseSection;

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(response) {
  if (response.license === 'GNU GPLv3') {
    licenseBadge = `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)]`;
  } else if (response.license === 'MIT') {
    licenseBadge = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]`;
  } else if (response.license === 'Apache') {
    licenseBadge = `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)]`;
  } else if (response.license === 'ISC') {
    licenseBadge = `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)]`;
  } else {
    licenseBadge = '';
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(response) {
  if (response.license === "GNU GPLv3") {
    licenseLink = `(https://www.gnu.org/licenses/gpl-3.0)`;
  } else if (response.license === "MIT") {
    licenseLink = `(https://opensource.org/licenses/MIT)`;
  } else if (response.license === "Apache") {
    licenseLink = `(https://opensource.org/licenses/Apache-2.0)`;
  } else if (response.license === "ISC") {
    licenseLink = `(https://opensource.org/licenses/ISC)`;
  } else {
    licenseLink = "";
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(response) {
  if (response.license !== 'No License'){
  return licenseSection = `This application is covered under the ${response.license} license.`;
  } else {
    return licenseSection = `The license for this application has not been set.`
  }
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(response) {
  renderLicenseBadge(response);
  renderLicenseLink(response);
  renderLicenseSection(response);
  
  return `# ${response.projectTitle} \n

  ## Description: \n
  ${response.projectDescription} \n
  ${licenseBadge}${licenseLink} \n

  ## Table of Contents: \n
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Testing](#tests)
  * [Contact](#contact)

  ## Installation: \n
  ${response.projectInstall}

  ## Usage: \n
  ${response.projectUsage}

  ## License: \n
  ${licenseSection}

  ## Contributing: \n
  ${response.contribution}

  ## Tests: \n
  ${response.testInstructions}

  ## Questions: \n
  GitHub: [${response.userName}](https://github.com/${response.userName})  
  By Email: [${response.userEmail}](mailto:${response.userEmail})
`;
}

module.exports = generateMarkdown;
