const p5 = require('p5js-node')
const fs = require("fs");
const path = require("path")

new p5((p)=>{
	p.setup = function() {
		p.createCanvas(700, 410);
	};

	p.draw = function() {
		p.background(0);
		p.fill(255);
		p.rect(10,10, 50, 50);
	
		fs.promises.writeFile(path.join(__dirname,"..","test.png"), p.canvas.toBuffer("raw"))
	};
})
