const ageInput = document.querySelector('#age');
const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');
const resultBlock = document.querySelector('.counter__result');
const submitButton = document.querySelector('.form__submit-button');
const resetButton = document.querySelector('.form__reset-button');
const maintaining = resultBlock.querySelector('#calories-norm');
const loss = resultBlock.querySelector('#calories-minimal');
const gain = resultBlock.querySelector('#calories-maximal');

function getCoefficient(activityName) {
    switch (activityName) {
        case 'min':
            return 1.2;
        case 'low':
            return 1.375;
        case 'medium':
            return 1.55;
        case 'high':
            return 1.725;
        case 'max':
            return 1.9;
    }
}

function submit(event) {
    event.preventDefault();
    const activityName = document.querySelector('input[name="activity"]:checked').value;
    const constant = document.querySelector('input[name="gender"]:checked').value === 'male' ? 5 : -161;
    const result = ((10 * weightInput.value) + (6.25 * heightInput.value) - (5 * ageInput.value) + constant) * getCoefficient(activityName);

    maintaining.textContent = String(Math.round(result));
    gain.textContent = String(Math.round(result * 1.15));
    loss.textContent = String(Math.round(result * 0.85));
    resultBlock.classList.remove('counter__result--hidden');
}

const reset = () => {
    ageInput.value = '';
    heightInput.value = '';
    weightInput.value = '';
    resultBlock.classList.add('counter__result--hidden');
    resetButton.disabled = true
    submitButton.disabled = true;
};

function checkButtonsActivity() {
    submitButton.disabled = !(ageInput.value > 0 && heightInput.value > 0 && weightInput.value > 0);
    resetButton.disabled = !(ageInput.value > 0 || heightInput.value > 0 || weightInput.value > 0);
}

function init() {
    document.querySelector('.inputs-group').addEventListener('input', checkButtonsActivity);
    submitButton.addEventListener('click', submit);
    resetButton.addEventListener('click', reset);
}

init();
