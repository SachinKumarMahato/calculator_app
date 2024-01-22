(function Calculator() {
  const buttons = document.querySelectorAll('.btn');
  const input = document.querySelector('input');
  const operators = document.querySelectorAll('.operator');
  const reset = document.querySelector('.reset');
  const equal = document.querySelector('.equal');
  const del = document.querySelector('.del');
  const dot = document.querySelector('.dot');

  let currentValue = '';
  let operator = null;
  let currSum = 0;
  let prevOperator = null;

  function handleButtonClick(button) {
    const value = (button.innerText);
    currentValue += value;
    input.value += value;
  }

  function Calculate(currVal, prevVal, op) {
    const currNum = parseFloat(currVal);
    const prevNum = parseFloat(prevVal);

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
  function handleOperationClick(op) {
    try {
      const operatorVal = op.innerText;
      operator = operatorVal;
      if (currentValue !== '') {
        if (currSum === 0) {
          currSum = currentValue;
        } else {
          currSum = Calculate(currSum, currentValue, prevOperator);
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
        currSum = Calculate(currSum, currentValue, operator);
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
    if (input.value !== '') {
      input.value = input.value.slice(0, -1);
      currSum = input.value;
      currentValue = currentValue.slice(0, -1);
      console.log(typeof currSum);
      console.log('curr', currentValue);
      console.log('currSum', currSum);
    }
  });
  dot.addEventListener('click', () => {
    if (!dot.disabled && !input.value.includes('.')) {
      dot.disabled = true;
    }
  });

  equal.addEventListener('click', handleEqualClick);

  document.addEventListener('keydown', (event) => {
    event.preventDefault();
  });
}());
