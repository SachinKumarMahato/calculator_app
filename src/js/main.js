const buttons = document.querySelectorAll('.btn');
const input = document.querySelector('input');
const operators = document.querySelectorAll('.operator');
const reset = document.querySelector('.reset');
const equal = document.querySelector('.equal');
const del = document.querySelector('.del');

let currentValue = '';
let operator = null;
let currSum = 0;
let prevOperator = null;

function handleButtonClick(button) {
  const value = (button.innerText);
  currentValue += value;
  console.log('curr', currentValue);
  input.value += value;
}

function add(currVal, prevVal, op) {
  const currNum = parseFloat(currVal);
  const prevNum = parseFloat(prevVal);
  console.log('currNum', currNum);
  console.log('prevNum', prevNum);
  switch (op) {
    case '+':
      return ((currNum + prevNum)).toString();

    case '-':
      return ((currNum - prevNum)).toString();

    case 'x':
      return ((currNum * prevNum)).toString();

    case '/':
      return ((currNum / prevNum)).toString();

    default:
      throw Error('something wrong');
  }
}
console.log(add(170, 100, 'x'));
function handleOperationClick(op) {
  try {
    const operatorVal = op.innerText;
    operator = operatorVal;
    console.log('op', operator);
    if (currentValue !== '') {
      if (currSum === 0) {
        currSum = currentValue;
      } else {
        console.log('currSum', currSum);
        currSum = add(currSum, currentValue, prevOperator);
      }
    }
    currentValue = '';
    input.value += operatorVal;
    prevOperator = operator;
  } catch (err) {
    throw new Error(err);
  }
}
function handleResetClick() {
  input.value = '';
  currentValue = '';
  currSum = 0;
  operator = null;
}
function handleEqualClick() {
  try {
    if (equal.innerText === '=') {
      currSum = add(currSum, currentValue, operator);
      // console.log('currSum', currSum);
      // console.log('currVal', currentValue);
      // console.log('op', operator);
      currentValue = '';
      operator = null;
      input.value = currSum;
    }
  } catch (error) {
    throw new Error(error);
  }
}
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    handleButtonClick(button);
  });
});

operators.forEach((op) => {
  op.addEventListener('click', () => {
    handleOperationClick(op);
  });
});

reset.addEventListener('click', handleResetClick);

del.addEventListener('click', () => {
  if (input.value === '') {
    alert('please click on the numbers');
  }
});

equal.addEventListener('click', () => {
  handleEqualClick();
});
