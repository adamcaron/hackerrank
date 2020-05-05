'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the sockMerchant function below.
function sockMerchant(n, ar) {
    const grouped = ar.reduce((acc, color) => {
        if (!acc.hasOwnProperty('pairs')) {
            // create a place to count the pairs of socks
            acc['pairs'] = 0
        }
        if (acc.hasOwnProperty(color)) {
            // count the pair
            acc['pairs'] = acc['pairs'] += 1
            // remove the unmatched sock
            delete acc[color]
        } else {
            // set new potential pair
            acc[color] = 1
        }
        return acc
    }, {})

    return grouped.pairs
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const ar = readLine().split(' ').map(arTemp => parseInt(arTemp, 10));

    let result = sockMerchant(n, ar);

    ws.write(result + "\n");

    ws.end();
}
