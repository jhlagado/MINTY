const words = [
    '',
    '/',
    'abs',
    'alloc',
    'aln',
    'args',
    'bye',
    'byte',
    'cgo',
    'cll',
    'cls',
    'cmv',
    'cur',
    'dec',
    'echo',
    'f',
    'free',
    'hex',
    'in',
    'nil',
    'max',
    'min',
    'out',
    'recur',
    'remain',
    'return',
    'sbb',
    'sbe',
    'scmp',
    'select',
    'sln',
    'sys',
    't',
    'var',
    'void',
    'while',
    'word',
    'xor'
];

let key = 0;
while (key < 2 ** 12) {
    let result = [];
    let flag = true;
    for (sym of words) {
        let hash = 0;
        for (ch of sym) {
            const a = ch.charCodeAt(0) - 'a'.charCodeAt(0);
            hash = (hash * key + a);
        }
        let idx = hash & 0xFF;
        if (result[idx]) {
            flag = false;
            break;
        }
        result[idx] = sym;
    }
    if (flag) {
        console.log('Success!', key, key.toString(16), result.length);
        for (let j = 0; j < 16; j++) {
            let line = "db ";
            for (let i = 0; i < 16; i++) {
                const idx = j * 16 + i;
                const sym = result[idx];
                if (sym === undefined) line += 0
                else if (sym === "") line += `lsb(div_)`;
                else if (sym === "/") line += `lsb(cmt_)`;
                else line += `lsb(${sym}_)`;
                if (i < 15) line += ','
            }
            console.log(line);
        }
        break;
    }
    key++;
}
