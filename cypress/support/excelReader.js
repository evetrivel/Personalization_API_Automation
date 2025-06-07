const XLSX = require('xlsx');
const fs = require('fs-extra');

const filePath = 'cypress/fixtures/input-param.csv';// Single Excel file for both input & output

// Function to read data from an Excel sheet
function readExcel(sheetName) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
        throw new Error(`Sheet "${sheetName}" not found in ${filePath}`);
    }

    return XLSX.utils.sheet_to_json(sheet);
}

// Function to write data to an Excel sheet
function writeExcel(sheetName, data) {
    let workbook;
    
    // Check if the file exists
    if (fs.existsSync(filePath)) {
        workbook = XLSX.readFile(filePath);
    } else {
        workbook = XLSX.utils.book_new();
    }

    const worksheet = XLSX.utils.json_to_sheet(data, { origin: 'A1' });

    // Add or update the sheet in the workbook
    workbook.Sheets[sheetName] = worksheet;

    // Save the workbook back to the file
    XLSX.writeFile(workbook, filePath);
}

module.exports = { readExcel, writeExcel };
