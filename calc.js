var calcEle = $('#calculator');
var resultEle = calcEle.find('.result')[0];

function updateResult(value){
	resultEle.textContent = value;
}

var calc1 = calculator(updateResult);

calcEle.find('.cbutton').click(function(e){
	var val = e.target.textContent;
	calc1.input(val);
})
