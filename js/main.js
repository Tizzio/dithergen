 
window.addEventListener('load', function() {
	var w = 200;
	var h = 200;
	var div = document.getElementById("CanvasDiv");
	div.style.width = w+"px";
	div.style.height = h+"px";

	var canvas = document.getElementById("CanvasMain");
	canvas.setAttribute("width",w+"");
	canvas.setAttribute("height",h+"");
	canvas.defaultWidth = canvas.width;
	canvas.defaultHeight = canvas.height;
	
	var dg = new DitherGen(canvas);

	var imgData = dg.testGradient();
	
	dg.dither(imgData, 32);
}, true);

