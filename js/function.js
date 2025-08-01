/**Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.
 * @param {int} maxLength - длина строки для проверки
 * @param {string} someString - какая-то строка
 * @return {boolean} - истина, если строка меньше либо равна заданой длине
 */
const checkingStringLength = function (someString, someNumber) {
  return (someString.length < someNumber);
};


checkingStringLength ('проверяемая строка', 20);
checkingStringLength ('проверяемая строка', 18);
checkingStringLength ('проверяемая строка', 10);


/**Функция для проверки, является ли строка палиндромом.
 * @param {string} polindrome - проверяемая строка
 * @returns {boolean} - истина, если полиндром
 */
const chekingPolindrome = function (poliString) {

  // Приводим строку к нижнему регистру и удаляем все небуквенно-цифровые символы
  const cleanedString = poliString.toLowerCase().replace(/[^a-zа-яё0-9]/g, '');


  return (cleanedString === cleanedString.split('').reverse().join(''));
};


chekingPolindrome('Довод');
chekingPolindrome('Топот');
chekingPolindrome('Кекс');
chekingPolindrome('А роза упала на лапу Азора');
chekingPolindrome('Аргентина манит негра');
chekingPolindrome('');
chekingPolindrome('Леша на полке клопа нашел');
chekingPolindrome('12321');
chekingPolindrome('Краказябра - красивая!');
chekingPolindrome('Искать такси');
chekingPolindrome('Коту скоро сорок суток');
chekingPolindrome('Я — арка края');
chekingPolindrome('Умер, и мир ему');


/**Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
 * @param {string} extString - ghjdthzt
 * @returns {Integer} - возвращаемое число в формате Integer
 */
const extractingDigits = function (extString) {
  let result = '';
  let tempString;
  if (typeof extString === 'string') {
    tempString = extString;
  } else {
    tempString = extString.toString();
  }

  for (let i = 0; i < tempString.length; i++) {
    const char = tempString[i];
    if (char >= '0' && char <= '9') {
      result += char;
    }
  }

  if (result === '') {
    result = NaN;
  }

  return (parseInt(result, 10));
};

extractingDigits ('2023 год');
extractingDigits ('ECMAScript 2022');
extractingDigits ('1 кефир, 0.5 батона');
extractingDigits ('агент 007');
extractingDigits ('а я томат');
extractingDigits (2023);
extractingDigits (-1);
extractingDigits (1.5);
extractingDigits ('!');
extractingDigits ('');

/**
 * Делу — время

Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.

Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться как две цифры, так и одна. Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.

Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.


'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах

имяФункции('08:00', '17:30', '14:00', 90); // true
имяФункции('8:0', '10:0', '8:0', 120);     // true
имяФункции('08:00', '14:30', '14:00', 90); // false
имяФункции('14:00', '17:30', '08:0', 90);  // false
имяФункции('8:00', '17:30', '08:00', 900); // false
*/
