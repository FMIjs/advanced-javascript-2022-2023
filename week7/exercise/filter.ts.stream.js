// transform stream working with small buffer
// and regular expressions list to filter out
//
//
// Copyright Sofia University 2022
// Copyright G.Penkov / I.Idakiev
//
// License is
// Creative Commons - no commercial, attribution

const fs = require('fs'), os = require('os');
const { Readable, Writable, Transform } = require('stream');
const HWM = 5;  // high watermark - how many symbols to read

const regexen = [                  // thse may come from some file also
    /(num)+/,
    /!/,
    /[0-9]+/,
];

const rs = fs.createReadStream('./input.txt', 
    { encoding: 'utf-8', highWaterMark: HWM });
const ws = fs.createWriteStream('./output.txt', 
    { encoding: 'utf-8', highWaterMark: HWM });

let buf = ''; 

const tStream = new Transform({
    transform(chunk, encoding, callback) {
        const tChunk = chunk.toString();         // chunk is bytes  yet
        let spl = (buf + tChunk).split(os.EOL);  // convert it to chars
        buf = spl.pop();  // keep all remaining after newline in buffer

        if (chunk.length < HWM) {          // are we at the last chunk?
            spl.push(buf); // yes, then process the buffer as last line
        }

        spl = spl.map(line =>            // match each line in the array
            regexen.reduce((line, re) =>     // with each of the regexes
                line.replace(re, val =>   // replace all that matches...
                    val.replace(/./g, '*') )    // ...with that many *'s 
                , line) )    // starting with the original line contents 

        if (spl.length) {            // in case there are lines pending
            callback(null,                      // flush down the drain
                spl.join(os.EOL)
                + (chunk.length < HWM ? '' : os.EOL));
        }

        callback(null)                         // or else just continue
    }
});

rs.pipe(tStream).pipe(ws);

/*
    //  note: lines 40-43 can be written also as 
        for (re of regexen) {        // against each of the regexes
            line = line.replace(re, val =>  // all that matches ...
                val.replace(/./g, '*')) // ...replace with asterisk
        }
        return line
*/