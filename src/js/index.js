import { selector } from './lib.js';
import useState from './state.js'
import render from './render.js';
import { operatorValidator, digitValidator, calculrateValidator } from './validator.js';
import { calculate } from './operators.js';

const [state, setState, resetState] = useState();

const total = selector('#total');
const digits = selector('.digits');
const operators = selector('.operations');
const modifier = selector('.modifier');

function handleDigit(e) {
  const validator = digitValidator(state);
  if (!validator.isValid){
    return window.alert(validator.msg);
  }
  const digit = e.target.innerText;
  setState(digit);
  return render(total, state);
}

function handleOperators(e) {
  const operator = e.target.innerText;
  const validator = operatorValidator(state, operator)
  if (!validator.isValid) {
    return window.alert(validator.msg);
  }

  if (operator === '=') {
    const validator = calculrateValidator(state);
    if (!validator.isValid) {
      return window.alert(validator.msg);
    }
    const result = calculate(state);
    resetState();
    setState(result);
    return render(total, state);
  }

  setState(operator);
  return render(total, state);
}

function handleModifier() {
  resetState();
  return render(total);
}

digits.addEventListener('click', handleDigit);
operators.addEventListener('click', handleOperators);
modifier.addEventListener('click', handleModifier);
