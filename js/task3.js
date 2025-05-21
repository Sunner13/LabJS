document.addEventListener('DOMContentLoaded', () => {
    const textInputEl = document.getElementById('textInput');
    const countVowelWordsBtn = document.getElementById('countVowelWordsBtn');
    const vowelWordsResultEl = document.getElementById('vowelWordsResult');
    const vowelWordsErrorEl = document.getElementById('vowelWordsError');

    if (countVowelWordsBtn) {
        countVowelWordsBtn.addEventListener('click', () => {
            vowelWordsResultEl.textContent = '';
            vowelWordsErrorEl.textContent = '';

            const text = textInputEl.value.trim();
            if (!text) {
                vowelWordsErrorEl.textContent = 'Будь ласка, введіть текст.';
                return;
            }

            const vowels = "аеєиіїоуюяАЕЄИІЇОУЮЯaeiouAEIOU";
            
            const words = text.split(/\s+/).filter(word => word.length > 0);

            if (words.length === 0) {
                vowelWordsErrorEl.textContent = 'Текст не містить слів.';
                return;
            }

            let count = 0;
            words.forEach(word => {
                if (word.length > 0 && vowels.includes(word[0])) {
                    count++;
                }
            });

            vowelWordsResultEl.textContent = `Кількість слів, що починаються з голосної: ${count}.`;
        });
    }
});