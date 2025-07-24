// Функция для проверки длины строки.
const checkingStringLength = function (someString, someNumber) {
  return (someString.length < someNumber) ? 'true' : 'false';
};


checkingStringLength ('проверяемая строка', 20);
checkingStringLength ('проверяемая строка', 18);
checkingStringLength ('проверяемая строка', 10);


// Функция для проверки, является ли строка палиндромом
const chekingPolindrome = function (poliString) {

  // Приводим строку к нижнему регистру и удаляем все небуквенно-цифровые символы
  const cleanedString = poliString.toLowerCase().replace(/[^a-zа-яё0-9]/g, '');


  return (cleanedString === cleanedString.split('').reverse().join('')) ? 'true' : 'false';
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

//Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.

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

