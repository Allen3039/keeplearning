

const tmpl = `
name $name 
this should be normal $$name $$$$name
I have starred in $film
`

const PRE_TOKEN = "$";
function endOfWord(char) {
    return ['\n', ' ', '\r'].includes(char);
}
function template(tmpl, data) {
    let inMatch = false;
    let result = '';
    let name = '';
    for (const char of tmpl) {
        if (char === PRE_TOKEN) {
            if (inMatch) {
                result += char
                inMatch = false;
            } else {
                inMatch = true;
                name = '';
            }
        } else if (endOfWord(char)) {
            if (inMatch) {
                result += data[name];
                inMatch = false;
            }
            result += char;
        } else {
            if (inMatch) {

                name += char;
            } else {
                result += char;
            }
        }


    }
    return result;
}

console.assert(template(tmpl, {
    name: "ellen",
    film: "朱诺"
}) === `
name ellen 
this should be normal $name $$name
I have starred in 朱诺
`, 'not eqal')
console.log(template(tmpl, {
    name: "ellen",
    film: "朱诺"
}))