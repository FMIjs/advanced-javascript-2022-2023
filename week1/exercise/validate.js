var validate = problem => {
  if (!problem || typeof problem !== 'string' || !problem.length) { return '0/0'; }
  var parts = problem.split('=').map(a => a.trim());

  var executeOperation = ({ op, idx }, partArr) => {
    const lOper = +partArr[idx - 1];
    const rOper = +partArr[idx + 1];
    let res = null
    switch (op) {
      case '+': res = lOper + rOper; break;
      case '-': res = lOper - rOper; break;
      case '*': res = lOper * rOper; break;
      case '/': res = lOper / rOper; break;
    }
    return res;
  }
  var operators = ['+', '-', '*', '/'];
  var evaluatePart = (part) => {
    var partParts = part.split(' ');
    var operations = partParts.reduce((acc, curr, idx) => {
      if (!operators.includes(curr)) { return acc; }
      return [...acc, { op: curr, idx }];
    }, []);

    if (!operations.length) { return part; }
    const operationToExecute = operations.find(({ op }) => ['*', '/'].includes(op)) || operations[0];
    const operationRes = executeOperation(operationToExecute, partParts);
    const trimmedPart = part.split('').filter(pp => pp.trim());
    const partEvaluationRes = [...trimmedPart.slice(0, operationToExecute.idx - 1), operationRes, ...trimmedPart.slice(operationToExecute.idx + 2)].join(' ');
    return partEvaluationRes;
  }

  const { good, bad } = parts.reduce((acc, cPart, idx) => {
    if (idx === parts.length - 1) { return acc; }
    const currPartRes = evaluatePart(cPart);
    const opIsGood = currPartRes === parts[idx + 1];
    return { good: opIsGood ? acc.good + 1 : acc.good, bad: opIsGood ? acc.bad : acc.bad + 1 };
  }, { good: 0, bad: 0 })
  return `${good}/${good + bad}`;
}

console.log(validate('3 + 2 = 5'));
console.log(validate('7 - 3 * 2 + 1 = 4 * 2 + 1 = 8 + 1 = 9'));