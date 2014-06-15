 
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

	var imgData = dg.createGradient(true, [255, 0, 0, 255], [0, 0, 255, 255]);
	
	dg.dither(imgData);
}, true);


function DitherGen(canvas){
	//context 2d
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	if(!this.ctx){
		alert("Your browser does not support HTML5 Canvas");
	}
}
DitherGen.prototype.createGradient = function(vertical, c1, c2, begin, end){
	if(begin == undefined){
		begin = 0;
		end = 1;
	}
	var w = this.canvas.width;
	var h = this.canvas.height;
	var imgData = this.ctx.createImageData(w, h)
	var data = imgData.data;
	for(var y = 0; y < h; y++){
		yw = y * w;
		r = y/h;
		for(var x = 0; x < w; x++){
			var i = (x + yw) * 4;
			this.pixelGradient(data, i, c1, c2, r);
		} 
	}
	this.ctx.putImageData(imgData,0,0);
	
	return imgData;
}


DitherGen.prototype.dither = function(imgData){
	var w = imgData.width;
	var h = imgData.height;
	var data = imgData.data;
	
	for(var y = 0; y < h; y++){
		yw = y * w;
		ywD = (y+1) * w;
		r = y/h;
		rv = r * 255;
		for(var x = 0; x < w; x++){
			var i = (x + yw) * 4;
			var oPx = this.pixelGet(data, i);
			var nPx = this.colorReduce(oPx, 64);
			var dPx = this.colorDifference(oPx, nPx);
			this.pixelSet(data, i, nPx);
			
			var i1 = (x+1 + yw) * 4;
			this.pixelAdd(data, i1, this.colorMultiply(dPx, 7/16));
			
			var i2 = (x-1 + ywD) * 4;
			this.pixelAdd(data, i2, this.colorMultiply(dPx, 3/16));
			
			var i3 = (x + ywD) * 4;
			this.pixelAdd(data, i3, this.colorMultiply(dPx, 5/16));
			
			var i4 = (x+1 + ywD) * 4;
			this.pixelAdd(data, i4, this.colorMultiply(dPx, 1/16));	
		} 
	}
	this.ctx.putImageData(imgData,0,0);
	
}


DitherGen.prototype.pixelSet = function(data, i, c){
	data[i  ] = c[0];
	data[i+1] = c[1];
	data[i+2] = c[2];
	data[i+3] = c[3];
}

DitherGen.prototype.pixelGet = function(data, i){
	return [
	data[i  ],
	data[i+1],
	data[i+2],
	data[i+3]
	];
}

DitherGen.prototype.pixelReduce = function(data, i, a){
	return [
	Math.floor(data[i]/a)*a,
	Math.floor(data[i+1]/a)*a,
	Math.floor(data[i+1]/a)*a,
	Math.floor(data[i+1]/a)*a
	];
}

DitherGen.prototype.colorReduce = function(c, a){
	return [
	Math.floor(c[0]/a)*a,
	Math.floor(c[1]/a)*a,
	Math.floor(c[2]/a)*a,
	255
	];
}

DitherGen.prototype.colorDifference = function(c1, c2){
	return [
	c1[0] - c2[0],
	c1[1] - c2[1],
	c1[2] - c2[2],
	255
	];
}

DitherGen.prototype.colorMultiply = function(c, val){
	return [
	c[0] * val,
	c[1] * val,
	c[2] * val,
	c[3]
	]
}



DitherGen.prototype.pixelMultiply = function(data, i, g){
	data[i  ] *= g;
	data[i+1] *= g;
	data[i+2] *= g;
	data[i+3] = 255;
}

DitherGen.prototype.pixelAdd = function(data, i, c){
	data[i  ] += c[0];
	data[i+1] += c[1];
	data[i+2] += c[2];
	data[i+3] += c[3];
}

DitherGen.prototype.pixelGradient = function(data, i, c1, c2, g){
	data[i  ] = Math.lerp(c1[0], c2[0], g);
	data[i+1] = Math.lerp(c1[1], c2[1], g);
	data[i+2] = Math.lerp(c1[2], c2[2], g);
	data[i+3] = 255;
}


Math.lerp = function(a, b, t){
	return (1-t)*a + t*b;
}