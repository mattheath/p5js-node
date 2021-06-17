/**
 * @module Environment
 * @submodule Environment
 * @for p5
 * @requires core
 */

import p5 from '../core/main';


//helper function returns true when accessible outputs are true
p5.prototype._addAccsOutput = function() {
  //if there are no accessible outputs create object with all false
  if (!this._accessibleOutputs) {
    this._accessibleOutputs = {
      text: false,
      grid: false,
      textLabel: false,
      gridLabel: false
    };
  }
  return this._accessibleOutputs.grid || this._accessibleOutputs.text;
};


//this function is called at the end of setup and draw if using
//accessibleOutputs and calls update functions of outputs
p5.prototype._updateAccsOutput = function() {
  let cnvId = this.canvas.id;
  //if the shapes are not the same as before
  if (JSON.stringify(this.ingredients.shapes) !== this.ingredients.pShapes) {
    //save current shapes as string in pShapes
    this.ingredients.pShapes = JSON.stringify(this.ingredients.shapes);
    if (this._accessibleOutputs.text) {
      this._updateTextOutput(cnvId + 'textOutput');
    }
    if (this._accessibleOutputs.grid) {
      this._updateGridOutput(cnvId + 'gridOutput');
    }
    if (this._accessibleOutputs.textLabel) {
      this._updateTextOutput(cnvId + 'textOutputLabel');
    }
    if (this._accessibleOutputs.gridLabel) {
      this._updateGridOutput(cnvId + 'gridOutputLabel');
    }
  }
};

//helper function that resets all ingredients when background is called
//and saves background color name
p5.prototype._accsBackground = function(args) {
  //save current shapes as string in pShapes
  this.ingredients.pShapes = JSON.stringify(this.ingredients.shapes);
  //empty shapes JSON
  this.ingredients.shapes = {};
  //update background different
  if (this.ingredients.colors.backgroundRGBA !== args) {
    this.ingredients.colors.backgroundRGBA = args;
    this.ingredients.colors.background = this._rgbColorName(args);
  }
};

//helper function that gets fill and stroke of shapes
p5.prototype._accsCanvasColors = function(f, args) {
  if (f === 'fill') {
    //update fill different
    if (this.ingredients.colors.fillRGBA !== args) {
      this.ingredients.colors.fillRGBA = args;
      this.ingredients.colors.fill = this._rgbColorName(args);
    }
  } else if (f === 'stroke') {
    //update stroke if different
    if (this.ingredients.colors.strokeRGBA !== args) {
      this.ingredients.colors.strokeRGBA = args;
      this.ingredients.colors.stroke = this._rgbColorName(args);
    }
  }
};

//builds ingredients.shapes used for building outputs
p5.prototype._accsOutput = function(f, args) {
  if (f === 'ellipse' && args[2] === args[3]) {
    f = 'circle';
  } else if (f === 'rectangle' && args[2] === args[3]) {
    f = 'square';
  }
  let include = {};
  let add = true;
  let middle = _getMiddle(f, args);
  if (f === 'line') {
    //make color stroke
    include.color = this.ingredients.colors.stroke;
    //get lenght
    include.length = Math.round(this.dist(args[0], args[1], args[2], args[3]));
    //get position of end points
    let p1 = _getPos([args[0], [1]], this.width, this.height);
    let p2 = _getPos([args[2], [3]], this.width, this.height);
    include.loc = _canvasLocator(middle, this.width, this.height);
    if (p1 === p2) {
      include.pos = `at ${p1}`;
    } else {
      include.pos = `from ${p1} to ${p2}`;
    }
  } else {
    if (f === 'point') {
      //make color stroke
      include.color = this.ingredients.colors.stroke;
    } else {
      //make color fill
      include.color = this.ingredients.colors.fill;
      //get area of shape
      include.area = _getArea(f, args, this.width, this.height);
    }
    //get middle of shapes
    //calculate position using middle of shape
    include.pos = _getPos(middle, this.width, this.height);
    //calculate location using middle of shape
    include.loc = _canvasLocator(middle, this.width, this.height);
  }
  //if it is the first time this shape is created
  if (!this.ingredients.shapes[f]) {
    this.ingredients.shapes[f] = [include];
    //if other shapes of this type have been created
  } else if (this.ingredients.shapes[f] !== [include]) {
    //for every shape of this type
    for (let y in this.ingredients.shapes[f]) {
      //compare it with current shape and if it already exists make add false
      if (
        JSON.stringify(this.ingredients.shapes[f][y]) ===
        JSON.stringify(include)
      ) {
        add = false;
      }
    }
    //add shape by pushing it to the end
    if (add === true) {
      this.ingredients.shapes[f].push(include);
    }
  }
};

//gets middle point / centroid of shape
function _getMiddle(f, args) {
  let x, y;
  if (
    f === 'rectangle' ||
    f === 'ellipse' ||
    f === 'arc' ||
    f === 'circle' ||
    f === 'square'
  ) {
    x = Math.round(args[0] + args[2] / 2);
    y = Math.round(args[1] + args[3] / 2);
  } else if (f === 'triangle') {
    x = (args[0] + args[2] + args[4]) / 3;
    y = (args[1] + args[3] + args[5]) / 3;
  } else if (f === 'quadrilateral') {
    x = (args[0] + args[2] + args[4] + args[6]) / 4;
    y = (args[1] + args[3] + args[5] + args[7]) / 4;
  } else if (f === 'line') {
    x = (args[0] + args[2]) / 2;
    y = (args[1] + args[3]) / 2;
  } else {
    x = args[0];
    y = args[1];
  }
  return [x, y];
}

//gets position of shape in the canvas
function _getPos(args, canvasWidth, canvasHeight) {
  if (args[0] < 0.4 * canvasWidth) {
    if (args[1] < 0.4 * canvasHeight) {
      return 'top left';
    } else if (args[1] > 0.6 * canvasHeight) {
      return 'bottom left';
    } else {
      return 'mid left';
    }
  } else if (args[0] > 0.6 * canvasWidth) {
    if (args[1] < 0.4 * canvasHeight) {
      return 'top right';
    } else if (args[1] > 0.6 * canvasHeight) {
      return 'bottom right';
    } else {
      return 'mid right';
    }
  } else {
    if (args[1] < 0.4 * canvasHeight) {
      return 'top middle';
    } else if (args[1] > 0.6 * canvasHeight) {
      return 'bottom middle';
    } else {
      return 'middle';
    }
  }
}

//locates shape in a 10*10 grid
function _canvasLocator(args, canvasWidth, canvasHeight) {
  const noRows = 10;
  const noCols = 10;
  let locX = Math.floor(args[0] / canvasWidth * noRows);
  let locY = Math.floor(args[1] / canvasHeight * noCols);
  if (locX === noRows) {
    locX = locX - 1;
  }
  if (locY === noCols) {
    locY = locY - 1;
  }
  return {
    locX,
    locY
  };
}

//calculates area of shape
function _getArea(objectType, shapeArgs, canvasWidth, canvasHeight) {
  let objectArea = 0;
  if (objectType === 'arc') {
    // area of full ellipse = PI * horizontal radius * vertical radius.
    // therefore, area of arc = difference bet. arc's start and end radians * horizontal radius * vertical radius.
    // the below expression is adjusted for negative values and differences in arc's start and end radians over PI*2
    const arcSizeInRadians =
      ((shapeArgs[5] - shapeArgs[4]) % (Math.PI * 2) + Math.PI * 2) %
      (Math.PI * 2);
    objectArea = arcSizeInRadians * shapeArgs[2] * shapeArgs[3] / 8;
    if (shapeArgs[6] === 'open' || shapeArgs[6] === 'chord') {
      // when the arc's mode is OPEN or CHORD, we need to account for the area of the triangle that is formed to close the arc
      // (Ax( By −  Cy) + Bx(Cy − Ay) + Cx(Ay − By ) )/2
      const Ax = shapeArgs[0];
      const Ay = shapeArgs[1];
      const Bx =
        shapeArgs[0] + shapeArgs[2] / 2 * Math.cos(shapeArgs[4]).toFixed(2);
      const By =
        shapeArgs[1] + shapeArgs[3] / 2 * Math.sin(shapeArgs[4]).toFixed(2);
      const Cx =
        shapeArgs[0] + shapeArgs[2] / 2 * Math.cos(shapeArgs[5]).toFixed(2);
      const Cy =
        shapeArgs[1] + shapeArgs[3] / 2 * Math.sin(shapeArgs[5]).toFixed(2);
      const areaOfExtraTriangle =
        Math.abs(Ax * (By - Cy) + Bx * (Cy - Ay) + Cx * (Ay - By)) / 2;
      if (arcSizeInRadians > Math.PI) {
        objectArea = objectArea + areaOfExtraTriangle;
      } else {
        objectArea = objectArea - areaOfExtraTriangle;
      }
    }
  } else if (objectType === 'ellipse' || objectType === 'circle') {
    objectArea = 3.14 * shapeArgs[2] / 2 * shapeArgs[3] / 2;
  } else if (objectType === 'line') {
    objectArea = 0;
  } else if (objectType === 'point') {
    objectArea = 0;
  } else if (objectType === 'quadrilateral') {
    // ((x4+x1)*(y4-y1)+(x1+x2)*(y1-y2)+(x2+x3)*(y2-y3)+(x3+x4)*(y3-y4))/2
    objectArea =
      Math.abs(
        (shapeArgs[6] + shapeArgs[0]) * (shapeArgs[7] - shapeArgs[1]) +
          (shapeArgs[0] + shapeArgs[2]) * (shapeArgs[1] - shapeArgs[3]) +
          (shapeArgs[2] + shapeArgs[4]) * (shapeArgs[3] - shapeArgs[5]) +
          (shapeArgs[4] + shapeArgs[6]) * (shapeArgs[5] - shapeArgs[7])
      ) / 2;
  } else if (objectType === 'rectangle' || objectType === 'square') {
    objectArea = shapeArgs[2] * shapeArgs[3];
  } else if (objectType === 'triangle') {
    objectArea =
      Math.abs(
        shapeArgs[0] * (shapeArgs[3] - shapeArgs[5]) +
          shapeArgs[2] * (shapeArgs[5] - shapeArgs[1]) +
          shapeArgs[4] * (shapeArgs[1] - shapeArgs[3])
      ) / 2;
    // (Ax( By −  Cy) + Bx(Cy − Ay) + Cx(Ay − By ))/2
  }

  return Math.round(objectArea * 100 / (canvasWidth * canvasHeight));
}

export default p5;
