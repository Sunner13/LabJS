document.addEventListener('DOMContentLoaded', () => {
    const arrayInputEl = document.getElementById('arrayInput');
    const calculateAverageBtn = document.getElementById('calculateAverageBtn');
    const averageResultEl = document.getElementById('averageResult');
    const averageErrorEl = document.getElementById('averageError');

    if (calculateAverageBtn) {
        calculateAverageBtn.addEventListener('click', () => {
            averageResultEl.textContent = '';
            averageErrorEl.textContent = '';

            const inputText = arrayInputEl.value.trim();
            if (!inputText) {
                averageErrorEl.textContent = 'Будь ласка, введіть числа.';
                return;
            }

            const stringNumbers = inputText.split(/[\s,]+/).filter(s => s !== "");
            
            if (stringNumbers.length === 0) {
                averageErrorEl.textContent = 'Не знайдено чисел для обчислення.';
                return;
            }

            const numbers = [];
            for (let strNum of stringNumbers) {
                const num = parseFloat(strNum.replace(',', '.')); // Дозволяємо кому як десятковий розділювач
                if (isNaN(num)) {
                    averageErrorEl.textContent = `Некоректне значення "${strNum}". Введіть тільки числа.`;
                    return;
                }
                numbers.push(num);
            }

            if (numbers.length === 0) {
                averageErrorEl.textContent = 'Масив чисел порожній.';
                return;
            }

            const sum = numbers.reduce((acc, val) => acc + val, 0);
            const average = sum / numbers.length;

            averageResultEl.textContent = `Середнє значення: ${average.toLocaleString(undefined, {maximumFractionDigits: 5})}.`;
        });
    }
});