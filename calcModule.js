var calculator = (function () {	
	var innerFactory = function(displayValue){
		var innerCalc = {};	
		let currentTotal = '';
		let operators = [];
		let operands = [];
		const availableOperators = {'+': add, '-': minus, '*': multiply, '/':divide};
		const operatorsByPrecedence = [multiply,divide,add,minus];

		function add(leftVal, rightVal){
			return leftVal + rightVal;
		}
		function minus(leftVal, rightVal) {
			return leftVal - rightVal;
		}
		function multiply(leftVal, rightVal){
			return leftVal * rightVal;
		}
		function divide(leftVal, rightVal){
			if(val != 0){
				return leftVal / rightVal;
			}
		}

		function getExpressionValue() {
			// take each operator by precedence...
			operatorsByPrecedence.forEach((operator, index) => {
				const opIndex = 1 // yes, it's fake but we need a value here to enter while loop
				while(opIndex) {
					// ..find out if this operator is used in the expression
					const opIndex = operators.findIndex(operator);
					if (opIndex) {
						// ...if so, find operands for operator
						const leftOperand = operands[opIndex];
						const rightOperand = operands[opIndex+1];
						// ...replace the 2 operands with the result of the sub expression
						operands.splice(opIndex, 2, operator(leftOperand, rightOperand));
						// ...remove used operator from list
						operators.splice(opIndex,1);
					}
				}
				return operands[0];
			})
		}

		innerCalc.input = function(val) {
			if(val === "C"){
				currentTotal = '';
				displayValue(0);
				operands = [];
				operators = [];
				currentTotal = '';
			} else if(Object.keys(availableOperators).includes(val)) {
				if(currentTotal !== ''){
					operands.push(parseInt(currentTotal))
				};
				operators.push(availableOperators[val]);
				displayValue(val);
				currentTotal = '';
			} else if(['0','1','2','3','4','5','6','7','8','9'].includes(val)) {
				currentTotal += val;
				displayValue(currentTotal);	
			} else if(val === '=') {
				if(currentTotal !== ''){
					operands.push(parseInt(currentTotal));
				}
				currentTotal = '';
				displayValue(getExpressionValue());
			}
		}

		return innerCalc;
	}
	return innerFactory;
}());