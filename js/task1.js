document.addEventListener('DOMContentLoaded', () => {
    const inputValueEl = document.getElementById('inputValue');
    const fromUnitEl = document.getElementById('fromUnit');
    const toUnitEl = document.getElementById('toUnit');
    const convertBtn = document.getElementById('convertUnitsBtn');
    const resultEl = document.getElementById('unitResult');
    const errorEl = document.getElementById('unitError');

    if (convertBtn) {
        convertBtn.addEventListener('click', () => {
            resultEl.textContent = '';
            errorEl.textContent = '';

            const value = parseFloat(inputValueEl.value);
            const fromUnit = fromUnitEl.value;
            const toUnit = toUnitEl.value;

            if (isNaN(value)) {
                errorEl.textContent = 'Будь ласка, введіть дійсне числове значення.';
                return;
            }
            if (value < 0) {
                errorEl.textContent = 'Значення не може бути від\'ємним.';
                return;
            }

            let valueInMeters;

            switch (fromUnit) {
                case 'km':
                    valueInMeters = value * 1000;
                    break;
                case 'm':
                    valueInMeters = value;
                    break;
                case 'cm':
                    valueInMeters = value / 100;
                    break;
                default:
                    errorEl.textContent = 'Невідома одиниця виміру (з).';
                    return;
            }

            let convertedValue;
            switch (toUnit) {
                case 'km':
                    convertedValue = valueInMeters / 1000;
                    break;
                case 'm':
                    convertedValue = valueInMeters;
                    break;
                case 'cm':
                    convertedValue = valueInMeters * 100;
                    break;
                default:
                    errorEl.textContent = 'Невідома одиниця виміру (в).';
                    return;
            }

            resultEl.textContent = `${value} ${fromUnit.toUpperCase()} = ${convertedValue.toLocaleString(undefined, {maximumFractionDigits: 5})} ${toUnit.toUpperCase()}`;
        });
    }
});