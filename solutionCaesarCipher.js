function movingShift(s, shift) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';

    function shiftChar(char, shift) {
        if (/[a-zA-Z]/.test(char)) {
            const isUpperCase = char === char.toUpperCase();
            const lowerChar = char.toLowerCase();
            const index = (alphabet.indexOf(lowerChar) + shift) % 26;
            let shiftedChar = alphabet[index];
            if (isUpperCase) shiftedChar = shiftedChar.toUpperCase();
            return shiftedChar;
        }
        return char;
    }

    for (let i = 0; i < s.length; i++) {
        result += shiftChar(s[i], shift + i);
    }

    const partLength = Math.ceil(result.length / 5);
    const parts = [];

    let startPos = 0;
    for (let i = 0; i < 5; i++) {
        let part = result.slice(startPos, startPos + partLength);
        
        if (i === 0) {
            part = ' '.repeat(partLength - part.length) + part;
        } else if (i === 4) {
            part += ' '.repeat(partLength - part.length);
        }

        parts.push(part);
        startPos += part.length;
    }

    return parts;
}

const s = "I should have known that you would have a perfect answer for me!!!";
const shift = 1;
console.log(movingShift(s, shift));
