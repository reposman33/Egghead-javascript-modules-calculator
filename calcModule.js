var calculator = (function () {	
	var innerFactory = function(displayValue){
		var innerCalc = {};	
		let currentTotal = '';
		let operators = [];
		let operands = [];

		const operatorFunctions = {'*': multiply, '/':divide, '+': add, '-': subtract};
		// first multply, then divide, add, subtract
		const operatorsByPrecedence = ['*','/','+','-'];

		// implementation of operators
		function add(leftOp, rightOp){
			return leftOp + rightOp;
		}
		function subtract(leftOp, rightOp) {
			return leftOp - rightOp;
		}
		function multiply(leftOp, rightOp){
			return leftOp * rightOp;
		}
		function divide(leftOp, rightOp){
			if(rightOp != 0){
				return leftOp / rightOp;
			}
		}

		/**
		 * @ description - scan user entered expression for operator with highest
		 * precedence, if found execute it, replace operands in operand array with result.
		 * Repeat until none left, delete optator fromoperatord array. Continue with next operator  
		 * @returns - number
		 */
		function getExpressionValue() {
			operatorsByPrecedence.forEach(operator => {
				let opIndex = 0; // set dummy value to get into wile loop
				while(opIndex !== -1) {
					// ..find out if this operator is used in the expression
					opIndex = operators.findIndex(op => op == operator);
					if (opIndex !== -1) {
						// ...if so, find operands for operator
						const leftOperand = operands[opIndex];
						const rightOperand = operands[opIndex+1];
						// ...replace the 2 operands with the result of the sub expression
						operands.splice(opIndex, 2, operatorFunctions[operator](leftOperand, rightOperand));
						// ...remove used operator from list
						operators.splice(opIndex,1);
					}
				}
			});
			// when all operators are executed, return remaining result
            return operands[0];
		}

		/**
		 * @description - process user clicked button
		 * @param {string} val - user clicked button value
		 */
		innerCalc.input = function(val) {
			if(val === "C"){
				currentTotal = '';
				displayValue(0);
				operands = [];
				operators = [];
				currentTotal = '';
				// is this a known operator?
			} else if(operatorsByPrecedence.includes(val)) {
				if(currentTotal !== ''){
					operands.push(parseInt(currentTotal))
				};
				operators.push(val);
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