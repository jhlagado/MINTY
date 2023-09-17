const words = [
    '',
    '/',
    'abs',
    'alc',
    'aln',
    'bye',
    'byt',
    'cgo',
    'cll',
    'cls',
    'cmv',
    'cur',
    'dec',
    'ech',
    'f',
    'fra',
    'fre',
    'hex',
    'in',
    'nil',
    'max',
    'min',
    'out',
    'rec',
    'rem',
    'ret',
    'sbb',
    'sbe',
    'scp',
    'sel',
    'sln',
    't',
    'var',
    'voi',
    'whi',
    'wrd',
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
                else if (sym === "") line += `lsb(div)`;
                else if (sym === "/") line += `lsb(cmt)`;
                else line += `lsb(${sym})`;
                if (i < 15) line += ','
            }
            console.log(line);
        }
        break;
    }
    key++;
}
