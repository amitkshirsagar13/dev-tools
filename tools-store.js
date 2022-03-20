import * as fs from 'fs';
import * as rl from 'readline';
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});

const addField = async () => {
    let fileName = './tmp/command.json';
    readFile(fileName).then(
        (command) => readInput('Next Field').then(
            (field) => {
                command.data[`fieldName${field}`] = field;
                writeFile(fileName, command);
            }
        )
    )
}

const readInput = async (msg) => {
    console.log('readInput');
    return new Promise((resolve, reject) => {
        readline.question(`${msg}: `, async (url) => {
            readline.close();
            resolve(url);
        });
    });
}

const readFile = async (jsFileName) => {
    console.log('readFile');
    return new Promise((resolve, reject) => {
            fs.readFile(jsFileName, (err, data) => {
            if (err) throw err;
            let json = JSON.parse(data);
            resolve(json)
        });
    });
}

const writeFile = async (fileName, data) => {
    console.log('writeFile');
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
}

export { addField, readInput, readFile, writeFile }