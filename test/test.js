process.on("unhandledRejection",(e)=>{
	console.error(e)
})
process.on("uncaughtException",(e)=>{
	console.error(e)
})
process.on("uncaughtExceptionMonitor",(e)=>{
	console.error(e)
})

const p5 =require('../dist/app')
const fs = require("fs");
const path = require("path")
const {performance} = require("perf_hooks")

var lastCalledTime;
var fps;
var i = 0

new p5((p)=>{


	p.setup = function() {
		p.createCanvas(700, 410);
		p.background(0);
		p.fill(255);
		p.rect(10,10, 50, 50);
		p.noLoop()
		fs.promises.writeFile(path.join(__dirname,"..","test.png"), p.canvas.toBuffer())
	};

	p.draw = function() {
		
		if(!lastCalledTime) {
			lastCalledTime = Date.now();
			fps = 0;
			return;
		}
		delta = (Date.now() - lastCalledTime)/1000;
		lastCalledTime = Date.now();
		fps = 1/delta;
		i++
		if (i >= 30) {
			i = 0
			console.log(Math.floor(fps))
		}
		
		fs.promises.writeFile(path.join(__dirname,"..","test.png"), p.canvas.toBuffer("raw"))
	};

	global.p = p
})
