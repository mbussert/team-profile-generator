const inquirer = require("inquirer");
const fs = require("fs");

const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");

let finalTeamArray = [];

function startingPrompt() {
  inquirer
    .prompt([
      {
        message:
          "Please enter a name for your team:",
        name: "teamname",
      },
    ])
    .then(function (data) {
      const teamName = data.teamname;
      finalTeamArray.push(teamName);
      addManager();
    });
}

function addManager() {
  inquirer
    .prompt([
      {
        message: "What is your team manager's name?",
        name: "name",
      },
      {
        message: "What is your team manager's email address?",
        name: "email",
      },

      {
        type: "number",
        message: "What is your team manager's office number?",
        name: "officeNumber",
      },
    ])

    .then(function (data) {
      const name = data.name;
      const id = 1;
      const email = data.email;
      const officeNumber = data.officeNumber;
      const teamMember = new Manager(name, id, email, officeNumber);
      finalTeamArray.push(teamMember);
      addTeamMembers();
    });
}

function addTeamMembers() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to add more team members?",
        choices: [
          "Yes, add an engineer",
          "Yes, add an intern",
          "No, there are no additional members",
        ],
        name: "addMemberData",
      },
    ])

    .then(function (data) {
      switch (data.addMemberData) {
        case "Yes, add an engineer":
          addEngineer();
          break;

        case "Yes, add an intern":
          addIntern();
          break;
        case "No, there are no additional members":
          compileTeam();
          break;
      }
    });
}

function addEngineer() {
  inquirer
    .prompt([
      {
        message: "What is the engineer's name?",
        name: "name",
      },
      {
        message: "What is the engineer's email address?",
        name: "email",
      },
      {
        message: "What is the engineer's GitHub profile?",
        name: "github",
      },
    ])

    .then(function (data) {
      const name = data.name;
      const id = finalTeamArray.length + 1;
      const email = data.email;
      const github = data.github;
      const teamMember = new Engineer(name, id, email, github);
      finalTeamArray.push(teamMember);
      addTeamMembers();
    });
}

function addIntern() {
  inquirer
    .prompt([
      {
        message: "What is the intern's name?",
        name: "name",
      },
      {
        message: "What is the intern's email address?",
        name: "email",
      },
      {
        message: "What school does the intern attend?",
        name: "school",
      },
    ])

    .then(function (data) {
      const name = data.name;
      const id = finalTeamArray.length + 1;
      const email = data.email;
      const school = data.school;
      const teamMember = new Intern(name, id, email, school);
      finalTeamArray.push(teamMember);
      addTeamMembers();
    });
}

function compileTeam() {
  console.log(`A profile page for ${finalTeamArray[0]} has been generated!`);

  const htmlArray = [];
  const htmlBeginning = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous">
    <link rel="stylesheet" href="./css/style.css">
    <title>${finalTeamArray[0]}</title>
  </head>
  <body>
    <section class="section mb-0 pb-0">
      <div class="container">
        <div class="notification is-primary has-text-centered has-background-info-dark box p-6">
          <h1 class="title">${finalTeamArray[0]}</h1>
        </div>
      </div>
    </section>

     <section class="section pt-5">
      <div class="container">
        <div class="tile is-ancestor">
    `;
  htmlArray.push(htmlBeginning);

  for (let i = 1; i < finalTeamArray.length; i++) {
    let object = `
        
      <div class="tile is-parent">
            <article class="tile is-child">
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title is-size-4">${finalTeamArray[i].title}</p>
                </header>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">${finalTeamArray[i].name}</p>
                      <p class="subtitle is-6"><a href="mailto:${finalTeamArray[i].email}">${finalTeamArray[i].email}</a></p>
                    </div>
                  </div>
                  <div class="content">
                    ID: ${finalTeamArray[i].id} <br />
        `;
    if (finalTeamArray[i].officeNumber) {
      object += `
            Office Number: ${finalTeamArray[i].officeNumber} <br />
            `;
    }
    if (finalTeamArray[i].github) {
      object += `
            GitHub: <a href="https://github.com/${finalTeamArray[i].github}">${finalTeamArray[i].github}</a> <br />
            `;
    }
    if (finalTeamArray[i].school) {
      object += `
            School: ${finalTeamArray[i].school} <br />
            `;
    }
    object += `
                  <br />
                  </div>
                </div>
              </div>
            </article>
          </div>
        `;
    htmlArray.push(object);
  }

  const htmlEnd = `
    </div>
      </div>
    </section>
  </body>
</html>
    `;
  htmlArray.push(htmlEnd);

  fs.writeFile(
    `./dist/${finalTeamArray[0]}.html`,
    htmlArray.join(""),
    function (err) {}
  );
}

startingPrompt();