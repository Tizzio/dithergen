 
window.addEventListener('load', function() {
	var div = document.getElementById("CanvasDiv");
	div.style.width = "600px";
	div.style.height = "400px";

	var canvas = document.getElementById("CanvasMain");
	canvas.setAttribute("width","600");
	canvas.setAttribute("height","400");
	canvas.defaultWidth = canvas.width;
	canvas.defaultHeight = canvas.height;
	
	var dg = new DitherGen(canvas);

}, true);


function DitherGen(canvas){
	//context 2d
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	if(!this.ctx){
		alert("Your browser does not support HTML5 Canvas");
	}
}

DitherGen.prototype.render = function(){

}

	
