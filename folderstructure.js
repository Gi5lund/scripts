
//importing required modules: filesystem and path
const fs = require('fs');
const path = require('path');
//this function is to be called recursively taking a path as params
function printFolderStructure(dirPath, indent = '', last = true) {
    const files = fs.readdirSync(dirPath); //returns an array of the directory and filenames at dirPath

    files.forEach((file, index) => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);
        const isLast = index === files.length - 1;

        process.stdout.write(indent);
        process.stdout.write(last ? '└── ' : '├── ');

        if (stats.isDirectory()) {
            console.log(file);
            printFolderStructure(filePath, indent + (last ? '    ' : '│   '), isLast);//recursive call: filepath is the path to the folder(directory)
        } else {
            console.log(file + (isLast ? '' : ''));
        }
    });
}

const folderPath = process.argv[2]; // Get the folder path from command line arguments

if (!folderPath) {
    console.error('Please provide the folder path as a parameter.');
    process.exit(1);
}

console.log(folderPath);
printFolderStructure(folderPath);