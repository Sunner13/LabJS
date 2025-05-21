document.addEventListener('DOMContentLoaded', () => {
    const numberInputEl = document.getElementById('numberInput');
    const convertToWordsBtn = document.getElementById('convertToWordsBtn');
    const wordsResultEl = document.getElementById('wordsResult');
    const wordsErrorEl = document.getElementById('wordsError');

    const units = ['', 'один', 'два', 'три', 'чотири', 'п\'ять', 'шість', 'сім', 'вісім', 'дев\'ять'];
    const teens = ['десять', 'одинадцять', 'дванадцять', 'тринадцять', 'чотирнадцять', 'п\'ятнадцять', 'шістнадцять', 'сімнадцять', 'вісімнадцять', 'дев\'ятнадцять'];
    const tens = ['', '', 'двадцять', 'тридцять', 'сорок', 'п\'ятдесят', 'шістдесят', 'сімдесят', 'вісімдесят', 'дев\'яносто'];
    const hundreds = ['', 'сто', 'двісті', 'триста', 'чотириста', 'п\'ятсот', 'шістсот', 'сімсот', 'вісімсот', 'дев\'ятсот'];
    
    const unitsFeminine = ['', 'одна', 'дві', 'три', 'чотири', 'п\'ять', 'шість', 'сім', 'вісім', 'дев\'ять'];


    function numberToWords(num, gender = 'male') {
        if (num === 0) return (gender === 'male' || gender === 'neuter') ? 'нуль' : 'нуль';

        let words = [];
        
        const currentUnits = (gender === 'female') ? unitsFeminine : units;

        if (num >= 1000000000) {
            words.push(numberToWords(Math.floor(num / 1000000000), 'male'));
            words.push(pluralize(Math.floor(num / 1000000000), 'мільярд', 'мільярди', 'мільярдів'));
            num %= 1000000000;
        }

        if (num >= 1000000) {
            words.push(numberToWords(Math.floor(num / 1000000), 'male'));
            words.push(pluralize(Math.floor(num / 1000000), 'мільйон', 'мільйони', 'мільйонів'));
            num %= 1000000;
        }

        if (num >= 1000) {
            words.push(numberToWords(Math.floor(num / 1000), 'female'));
            words.push(pluralize(Math.floor(num / 1000), 'тисяча', 'тисячі', 'тисяч'));
            num %= 1000;
        }

        if (num >= 100) {
            words.push(hundreds[Math.floor(num / 100)]);
            num %= 100;
        }

        if (num >= 20) {
            words.push(tens[Math.floor(num / 10)]);
            num %= 10;
        } else if (num >= 10) {
            words.push(teens[num - 10]);
            num = 0;
        }

        if (num > 0) {
            words.push(currentUnits[num]);
        }
        
        return words.filter(Boolean).join(' ');
    }

    function pluralize(count, one, few, many) {
        const mod10 = count % 10;
        const mod100 = count % 100;
        if (mod10 === 1 && mod100 !== 11) {
            return one;
        }
        if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
            return few;
        }
        return many;
    }

    if (convertToWordsBtn) {
        convertToWordsBtn.addEventListener('click', () => {
            wordsResultEl.textContent = '';
            wordsErrorEl.textContent = '';

            const inputStr = numberInputEl.value.trim().replace(',', '.');

            if (inputStr === "") {
                wordsErrorEl.textContent = "Поле не може бути порожнім.";
                return;
            }

            if (!/^\d+(\.\d{1,2})?$/.test(inputStr) && !/^\d+$/.test(inputStr)) {
                 wordsErrorEl.textContent = 'Введіть невід\'ємне число, ціле або з максимум двома знаками після коми.';
                return;
            }
            
            const num = parseFloat(inputStr);

            if (isNaN(num) || num < 0) {
                wordsErrorEl.textContent = 'Введіть коректне невід\'ємне число.';
                return;
            }
             if (num > 99999999.99) {
                wordsErrorEl.textContent = 'Число занадто велике.';
                return;
            }

            let integerPart = Math.floor(num);
            let fractionalPart = Math.round((num - integerPart) * 100);

            let resultWords = [];
            
            if (integerPart === 0 && fractionalPart === 0 && inputStr !== "0" && inputStr !== "0.0" && inputStr !== "0.00") {
                 wordsErrorEl.textContent = 'Введіть коректне невід\'ємне число.';
                 return;
            }
            
            if (integerPart === 0 && inputStr.startsWith("0")) {
                 resultWords.push("нуль");
            } else if (integerPart > 0) {
                resultWords.push(numberToWords(integerPart, 'male'));
            }
            
            if (fractionalPart > 0) {
                if (integerPart > 0 || (integerPart === 0 && inputStr.startsWith("0."))) resultWords.push("та");
                resultWords.push(numberToWords(fractionalPart, 'female'));
                resultWords.push(pluralize(fractionalPart, "сота", "соті", "сотих"));
            } else if (num === 0 && inputStr.match(/^0(\.00?)?$/)) {
            } else if (integerPart > 0 && (inputStr.endsWith(".0") || inputStr.endsWith(".00") || !inputStr.includes("."))) {
            }

            let finalStr = resultWords.filter(Boolean).join(' ');
            if (finalStr) {
                 finalStr = finalStr.charAt(0).toUpperCase() + finalStr.slice(1);
                 wordsResultEl.textContent = finalStr + ".";
            } else if (integerPart === 0 && fractionalPart === 0 && (inputStr === "0" || inputStr === "0.0" || inputStr === "0.00")) {
                 wordsResultEl.textContent = "Нуль.";
            } else {
                 wordsErrorEl.textContent = "Не вдалося обробити число.";
            }
        });
    }
});