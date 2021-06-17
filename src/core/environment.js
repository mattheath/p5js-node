/**
 * @module Environment
 * @submodule Environment
 * @for p5
 * @requires core
 * @requires constants
 */

import p5 from './main';
import * as C from './constants';
import {performance} from 'perf_hooks'

const standardCursors = [C.ARROW, C.CROSS, C.HAND, C.MOVE, C.TEXT, C.WAIT];

p5.prototype._frameRate = 0;
p5.prototype._lastFrameTime = performance.now();
p5.prototype._targetFrameRate = 60;


/**
 * The <a href="#/p5/print">print()</a> function writes to the console area of
 * your browser. This function is often helpful for looking at the data a program
 * is producing. This function creates a new line of text for each call to
 * the function. Individual elements can be separated with quotes ("") and joined
 * with the addition operator (+).
 *
 * Note that calling print() without any arguments invokes the print()
 * function which opens the browser's print dialog. To print a blank line
 * to console you can write print('\n').
 *
 * @method print
 * @param {Any} contents any combination of Number, String, Object, Boolean,
 *                       Array to print
 * @example
 * <div><code class='norender'>
 * let x = 10;
 * print('The value of x is ' + x);
 * // prints "The value of x is 10"
 * </code></div>
 *
 * @alt
 * default grey canvas
 */
p5.prototype.print = function(...args) {
  if (args.length) {
    console.log(...args);
  }
};

/**
 * The system variable <a href="#/p5/frameCount">frameCount</a> contains the
 * number of frames that have been displayed since the program started. Inside
 * <a href="#/p5/setup">setup()</a> the value is 0, after the first iteration
 * of draw it is 1, etc.
 *
 * @property {Integer} frameCount
 * @readOnly
 * @example
 * <div><code>
 * function setup() {
 *   frameRate(30);
 *   textSize(30);
 *   textAlign(CENTER);
 * }
 *
 * function draw() {
 *   background(200);
 *   text(frameCount, width / 2, height / 2);
 * }
 * </code></div>
 *
 * @alt
 * numbers rapidly counting upward with frame count set to 30.
 */
p5.prototype.frameCount = 0;

/**
 * The system variable <a href="#/p5/deltaTime">deltaTime</a> contains the time
 * difference between the beginning of the previous frame and the beginning
 * of the current frame in milliseconds.
 *
 * This variable is useful for creating time sensitive animation or physics
 * calculation that should stay constant regardless of frame rate.
 *
 * @property {Integer} deltaTime
 * @readOnly
 * @example
 * <div><code>
 * let rectX = 0;
 * let fr = 30; //starting FPS
 * let clr;
 *
 * function setup() {
 *   background(200);
 *   frameRate(fr); // Attempt to refresh at starting FPS
 *   clr = color(255, 0, 0);
 * }
 *
 * function draw() {
 *   background(200);
 *   rectX = rectX + 1 * (deltaTime / 50); // Move Rectangle in relation to deltaTime
 *
 *   if (rectX >= width) {
 *     // If you go off screen.
 *     if (fr === 30) {
 *       clr = color(0, 0, 255);
 *       fr = 10;
 *       frameRate(fr); // make frameRate 10 FPS
 *     } else {
 *       clr = color(255, 0, 0);
 *       fr = 30;
 *       frameRate(fr); // make frameRate 30 FPS
 *     }
 *     rectX = 0;
 *   }
 *   fill(clr);
 *   rect(rectX, 40, 20, 20);
 * }
 * </code></div>
 *
 * @alt
 * red rect moves left to right, followed by blue rect moving at the same speed
 * with a lower frame rate. Loops.
 */
p5.prototype.deltaTime = 0;

/**
 * Confirms if the window a p5.js program is in is "focused," meaning that
 * the sketch will accept mouse or keyboard input. This variable is
 * "true" if the window is focused and "false" if not.
 *
 * @property {Boolean} focused
 * @readOnly
 * @example
 * <div><code>
 * // To demonstrate, put two windows side by side.
 * // Click on the window that the p5 sketch isn't in!
 * function draw() {
 *   background(200);
 *   noStroke();
 *   fill(0, 200, 0);
 *   ellipse(25, 25, 50, 50);
 *
 *   if (!focused) {
    // or "if (focused === false)"
 *     stroke(200, 0, 0);
 *     line(0, 0, 100, 100);
 *     line(100, 0, 0, 100);
 *   }
 * }
 * </code></div>
 *
 * @alt
 * green 50x50 ellipse at top left. Red X covers canvas when page focus changes
 */
p5.prototype.focused = true


/**
 * Specifies the number of frames to be displayed every second. For example,
 * the function call frameRate(30) will attempt to refresh 30 times a second.
 * If the processor is not fast enough to maintain the specified rate, the
 * frame rate will not be achieved. Setting the frame rate within 
 * <a href="#/p5/setup">setup()</a> is recommended. The default frame rate is
 * based on the frame rate of the display (here also called "refresh rate"), 
 * which is set to 60 frames per second on most computers. A frame rate of 24
 * frames per second (usual for movies) or above will be enough for smooth 
 * animations. This is the same as setFrameRate(val).
 * 
 * Calling <a href="#/p5/frameRate">frameRate()</a> with no arguments returns
 * the current framerate. The draw function must run at least once before it will
 * return a value. This is the same as <a href="#/p5/getFrameRate">getFrameRate()</a>.
 *
 * Calling <a href="#/p5/frameRate">frameRate()</a> with arguments that are not
 * of the type numbers or are non positive also returns current framerate.
 *
 * @method frameRate
 * @param  {Number} fps number of frames to be displayed every second
 * @chainable
 *
 * @example
 *
 * <div><code>
 * let rectX = 0;
 * let fr = 30; //starting FPS
 * let clr;
 *
 * function setup() {
 *   background(200);
 *   frameRate(fr); // Attempt to refresh at starting FPS
 *   clr = color(255, 0, 0);
 * }
 *
 * function draw() {
 *   background(200);
 *   rectX = rectX += 1; // Move Rectangle
 *
 *   if (rectX >= width) {
    // If you go off screen.
 *     if (fr === 30) {
 *       clr = color(0, 0, 255);
 *       fr = 10;
 *       frameRate(fr); // make frameRate 10 FPS
 *     } else {
 *       clr = color(255, 0, 0);
 *       fr = 30;
 *       frameRate(fr); // make frameRate 30 FPS
 *     }
 *     rectX = 0;
 *   }
 *   fill(clr);
 *   rect(rectX, 40, 20, 20);
 * }
 * </code></div>
 *
 * @alt
 * blue rect moves left to right, followed by red rect moving faster. Loops.
 */
/**
 * @method frameRate
 * @return {Number}       current frameRate
 */
p5.prototype.frameRate = function(fps) {
  p5._validateParameters('frameRate', arguments);
  if (typeof fps !== 'number' || fps < 0) {
    return this._frameRate;
  } else {
    this._setProperty('_targetFrameRate', fps);
    if (fps === 0) {
      this._setProperty('_frameRate', fps);
    }
    return this;
  }
};

/**
 * Returns the current framerate.
 *
 * @private
 * @return {Number} current frameRate
 */
p5.prototype.getFrameRate = function() {
  return this.frameRate();
};

/**
 * Specifies the number of frames to be displayed every second. For example,
 * the function call frameRate(30) will attempt to refresh 30 times a second.
 * If the processor is not fast enough to maintain the specified rate, the
 * frame rate will not be achieved. Setting the frame rate within <a href="#/p5/setup">setup()</a> is
 * recommended. The default rate is 60 frames per second.
 *
 * Calling <a href="#/p5/frameRate">frameRate()</a> with no arguments returns the current framerate.
 *
 * @private
 * @param {Number} [fps] number of frames to be displayed every second
 */
p5.prototype.setFrameRate = function(fps) {
  return this.frameRate(fps);
};

/**
 * System variable that stores the width of the screen display according to The
 * default <a href="#/p5/pixelDensity">pixelDensity</a>. This is used to run a
 * full-screen program on any display size. To return actual screen size,
 * multiply this by pixelDensity.
 *
 * @property {Number} displayWidth
 * @readOnly
 * @example
 * <div class="norender"><code>
 * createCanvas(displayWidth, displayHeight);
 * </code></div>
 *
 * @alt
 * This example does not render anything.
 */
Object.defineProperty(p5.prototype, "displayWidth", {
    get: function() {
        return this.canvas.width
    }
});

/**
 * System variable that stores the height of the screen display according to The
 * default <a href="#/p5/pixelDensity">pixelDensity</a>. This is used to run a
 * full-screen program on any display size. To return actual screen size,
 * multiply this by pixelDensity.
 *
 * @property {Number} displayHeight
 * @readOnly
 * @example
 * <div class="norender"><code>
 * createCanvas(displayWidth, displayHeight);
 * </code></div>
 *
 * @alt
 * This example does not render anything.
 */
Object.defineProperty(p5.prototype, "displayHeight", {
    get: function() {
        return this.canvas.height
    }
});

/**
 * System variable that stores the width of the inner window, it maps to
 * window.innerWidth.
 *
 * @property {Number} windowWidth
 * @readOnly
 * @example
 * <div class="norender"><code>
 * createCanvas(windowWidth, windowHeight);
 * </code></div>
 *
 * @alt
 * This example does not render anything.
 */
Object.defineProperty(p5.prototype, "windowWidth", {
    get: function() {
        return this.canvas.width
    }
});

/**
 * System variable that stores the height of the inner window, it maps to
 * window.innerHeight.
 *
 * @property {Number} windowHeight
 * @readOnly
 * @example
 * <div class="norender"><code>
 * createCanvas(windowWidth, windowHeight);
 * </code></div>
 *
 * @alt
 * This example does not render anything.
 */
Object.defineProperty(p5.prototype, "windowHeight", {
    get: function() {
        return this.canvas.height
    }
});

/**
 * The <a href="#/p5/windowResized">windowResized()</a> function is called once
 * every time the browser window is resized. This is a good place to resize the
 * canvas or do any other adjustments to accommodate the new window size.
 *
 * @method windowResized
 * @param {Object} [event] optional Event callback argument.
 * @example
 * <div class="norender"><code>
 * function setup() {
 *   createCanvas(windowWidth, windowHeight);
 * }
 *
 * function draw() {
 *   background(0, 100, 200);
 * }
 *
 * function windowResized() {
 *   resizeCanvas(windowWidth, windowHeight);
 * }
 * </code></div>
 * @alt
 * This example does not render anything.
 */
p5.prototype._onresize = function(e) {
  const context = this;
  let executeDefault;
  if (typeof context.windowResized === 'function') {
    executeDefault = context.windowResized(e);
    if (executeDefault !== undefined && !executeDefault) {
      e.preventDefault();
    }
  }
};


/**
 * System variable that stores the width of the drawing canvas. This value
 * is set by the first parameter of the <a href="#/p5/createCanvas">createCanvas()</a> function.
 * For example, the function call createCanvas(320, 240) sets the width
 * variable to the value 320. The value of width defaults to 100 if
 * <a href="#/p5/createCanvas">createCanvas()</a> is not used in a program.
 *
 * @property {Number} width
 * @readOnly
 */
p5.prototype.width = 0;

/**
 * System variable that stores the height of the drawing canvas. This value
 * is set by the second parameter of the <a href="#/p5/createCanvas">createCanvas()</a> function. For
 * example, the function call createCanvas(320, 240) sets the height
 * variable to the value 240. The value of height defaults to 100 if
 * <a href="#/p5/createCanvas">createCanvas()</a> is not used in a program.
 *
 * @property {Number} height
 * @readOnly
 */
p5.prototype.height = 0;



/**
 * Sets the pixel scaling for high pixel density displays. By default
 * pixel density is set to match display density, call pixelDensity(1)
 * to turn this off. Calling <a href="#/p5/pixelDensity">pixelDensity()</a> with no arguments returns
 * the current pixel density of the sketch.
 *
 * @method pixelDensity
 * @param  {Number} val whether or how much the sketch should scale
 * @chainable
 * @example
 * <div>
 * <code>
 * function setup() {
 *   pixelDensity(1);
 *   createCanvas(100, 100);
 *   background(200);
 *   ellipse(width / 2, height / 2, 50, 50);
 * }
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * function setup() {
 *   pixelDensity(3.0);
 *   createCanvas(100, 100);
 *   background(200);
 *   ellipse(width / 2, height / 2, 50, 50);
 * }
 * </code>
 * </div>
 *
 * @alt
 * fuzzy 50x50 white ellipse with black outline in center of canvas.
 * sharp 50x50 white ellipse with black outline in center of canvas.
 */
/**
 * @method pixelDensity
 * @returns {Number} current pixel density of the sketch
 */
p5.prototype.pixelDensity = function(val) {
  p5._validateParameters('pixelDensity', arguments);
  let returnValue;
  if (typeof val !== 'number') throw new Error("invalid parameter, must be a number")
  if (val !== this._pixelDensity) {
    this._pixelDensity = val;
  }
  returnValue = this;
  this.resizeCanvas(this.width * val, this.height * val, true); // as a side effect, it will clear the canvas

  this._renderer.drawingContext.scale(val,val)
  return returnValue;
};

/**
 * Returns the pixel density of the current display the sketch is running on.
 *
 * @method displayDensity
 * @returns {Number} current pixel density of the display
 * @example
 * <div>
 * <code>
 * function setup() {
 *   let density = displayDensity();
 *   pixelDensity(density);
 *   createCanvas(100, 100);
 *   background(200);
 *   ellipse(width / 2, height / 2, 50, 50);
 * }
 * </code>
 * </div>
 *
 * @alt
 * 50x50 white ellipse with black outline in center of canvas.
 */
p5.prototype.displayDensity = function () {
  return this._pixelDensity
}

export default p5;
