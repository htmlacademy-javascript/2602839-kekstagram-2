// Функция для проверки длины строки.
const checkingStringLength = function (someString, someNumber) {
  console.log(someString.length < someNumber);
};


checkingStringLength ('проверяемая строка', 20);
checkingStringLength ('проверяемая строка', 18);
checkingStringLength ('проверяемая строка', 10);


// Функция для проверки, является ли строка палиндромом
const chekingPolindrome = function (poliString) {

  // Приводим строку к нижнему регистру и удаляем все небуквенно-цифровые символы
  const cleanedString = poliString.toLowerCase().replace(/[^a-zа-яё0-9]/g, '');

  // Выводим приведённую строку
  console.log(`Получили: ${ cleanedString}`);
  // Выводим перевёрнутую строку
  console.log(`Результат: ${ cleanedString.split('').reverse().join('')}`);
  // Выводим результат сравнения приведённой и её же перевёрнутой строк
  console.log(cleanedString === cleanedString.split('').reverse().join(''));
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

const extractingDigits = function (extString, extNumber) {
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
  console.log(`Была строка: ${ extString}`);
  console.log(`Получилось число: ${ parseInt(result, 10)}`);
  console.log(`а надо было: ${ extNumber}`);
  console.log(parseInt(result, 10) === extNumber);
  console.log('-------------');
};

extractingDigits ('2023 год', 2023);
extractingDigits ('ECMAScript 2022', 2022);
extractingDigits ('1 кефир, 0.5 батона', 105);
extractingDigits ('агент 007', 7);
extractingDigits ('а я томат', NaN);
extractingDigits (2023, 2023);
extractingDigits (-1, 1);
extractingDigits (1.5, 15);
extractingDigits ('!', NaN);
extractingDigits ('', NaN);

