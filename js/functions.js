// Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее. Эта функция нам пригодится для валидации формы.

function stringLength(string, maxLength) {
  return string.length <= maxLength;
}

stringLength('rrr', 10);

// Функция для проверки, является ли строка палиндромом.

function checkPalindrome(string) {
  const normalizeString = string.replaceAll(' ', '').toLowerCase();
  let newString = '';

  for (let i = normalizeString.length - 1; i >= 0; i--) {
    newString += normalizeString[i];
  }

  return newString === normalizeString;
}

checkPalindrome('Лёша на полке клопа нашёл ');


// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:

// имяФункции('2023 год');            // 2023
// имяФункции('ECMAScript 2022');     // 2022
// имяФункции('1 кефир, 0.5 батона'); // 105
// имяФункции('агент 007');           // 7
// имяФункции('а я томат');           // NaN

function positiveInteger(string) {
  const normalizedString = string.replaceAll(' ', '').toString();
  let newString = '';

  for (let i = 0; i <= string.length; i++) {
    const symbol = parseInt(normalizedString[i], 10);
    if (Number.isNaN(symbol)) {
      newString += '';
    } else {
      newString += symbol;
    }
  }

  return newString === '' ? NaN : newString;
}

positiveInteger('ECMAScript 2022');
