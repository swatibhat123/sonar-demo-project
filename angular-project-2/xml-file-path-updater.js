const fs = require('fs');
const xml2js = require('xml2js');

/**
 * Append a new path segment to the existing `path` attribute value for each `<file>` element in an XML file.
 * @param {string} xmlFilePath - The path to the XML file.
 * @param {string} newPathSegment - The new path segment to prepend to the existing `path`.
 */
function appendPathSegmentToXml(xmlFilePath, newPathSegment) {
    // Read the XML file
    fs.readFile(xmlFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading XML file:', err);
            return;
        }

        // Parse the XML content
        xml2js.parseString(data, (parseErr, result) => {
            if (parseErr) {
                console.error('Error parsing XML:', parseErr);
                return;
            }

            // Check if there are existing <file> elements
            if (result.testExecutions && result.testExecutions.file) {
                // Iterate through existing <file> elements
                result.testExecutions.file.forEach((file) => {
                    // Prepend the new path segment to the existing path attribute
                    if (file.$ && file.$.path) {
                        file.$.path = newPathSegment + '/' + file.$.path;
                    }
                });

                // Convert the modified XML object back to XML
                const builder = new xml2js.Builder();
                const modifiedXml = builder.buildObject(result);

                // Write the modified XML back to the file
                fs.writeFile(xmlFilePath, modifiedXml, 'utf-8', (writeErr) => {
                    if (writeErr) {
                        console.error('Error writing XML file:', writeErr);
                        return;
                    }

                    console.log(`New path segment '${newPathSegment}' prepended successfully.`);
                });
            } else {
                console.error('XML structure is not as expected.');
            }
        });
    });
}

// Example usage:
const xmlFilePath = '../coverage/angular-project-2.xml';
const newPathSegment = 'angular-project-2';

// Call the function with the desired XML file and new path segment
appendPathSegmentToXml(xmlFilePath, newPathSegment);
