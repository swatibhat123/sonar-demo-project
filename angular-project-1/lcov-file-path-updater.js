const fs = require('fs');

// Function to process an LCOV file and append paths
function processLcovFile(filePath, pathToAppend) {
  // Read the LCOV file
  fs.readFile(filePath, 'utf-8', (err, lcovData) => {
    if (err) {
      console.error(`Error reading LCOV file ${filePath}:`, err);
      return;
    }

    // Split the LCOV data into lines
    const lines = lcovData.split('\n');

    // Loop through the lines to find and modify the SF lines
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('SF:')) {
        // Append the new path to the existing source file path
        const existingPath = line.substring(3).trim();
        const newPath = pathToAppend + existingPath;
        lines[i] = `SF:${newPath}`;
      }
    }

    // Join the modified lines back into a single string
    const modifiedLcovData = lines.join('\n');

    // Write the modified LCOV data back to the file
    fs.writeFile(filePath, modifiedLcovData, 'utf-8', (writeErr) => {
      if (writeErr) {
        console.error(`Error writing modified LCOV to file ${filePath}:`, writeErr);
      } else {
        console.log(`LCOV file ${filePath} successfully modified.`);
      }
    });
  });
}

// Specify the paths to the LCOV files and the paths to append
const filePath = '../coverage/angular-project-1/test/component/lcov.info';
const  pathToAppend = 'angular-project-1/';

processLcovFile(filePath, pathToAppend);

