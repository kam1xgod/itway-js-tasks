
let second = "Вот пример строки,в которой     используются знаки препинания.После знаков должны стоять пробелы , а перед знаками их быть не должно .    Если есть лишние подряд идущие пробелы, они должны быть устранены.";
let third = "Harry,John,Clark,Peter,Rohn,Alice";
let four = "Текст, в котором слово текст несколько раз встречается и слово тоже";

lowerCase("NFDJGVDFNVJKDFJKVJMMK");
placeSpaces(second);
countWords(third);
countUnuqueWords(four);

function lowerCase(string) {
  string = string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  console.log(string);
}

function placeSpaces(string) {
  string = string.replace(/\s+/g, ' ')
    .replace(" ,", ',')
    .replace(/,(?=[^\s])/g, ", ")
    .replace('.', '. ')
    .replace(' .', '.')
    .trim();
  console.log(string);
}

function countWords(string) {
  let charsBySpace = string.split(' ');
  let charsByComma = string.split(',');
  console.log(charsByComma.length > charsBySpace.length ? charsByComma.length : charsBySpace.length);
}

function countUnuqueWords(string) {
  let map = new Map();
  let arr = string.split(' ');
  arr.forEach(el => {
    let count = map.has(el) ? map.get(el) : 0;
    map.set(el.replace(/[\,\.\-\(\)\?\!]+/g, '').toLowerCase(), count+1);
  })
  for (let entry of map) {
    console.log(String(entry).replace(',', ' - '));
  }
}
