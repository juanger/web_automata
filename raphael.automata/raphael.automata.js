/*
 * Creates a state at the given position with the given name
 */
Raphael.fn.state = function (_x, _y, _name, _options) {
  var size = 25;
  var stroke_width = 3;

  var outer = this.circle(_x,_y,size).attr({fill: 'white', 'stroke-width': stroke_width});
  var name = this.text(_x, _y, '' + _name).attr({'font-size': 16, fill: "#000"});
  var set = this.set(outer, name);
  if (_options && _options.accepts) {
    var inner = this.circle(_x,_y,size - stroke_width*1.5);
    set.push(inner);
  }

  set.name = function() {return this[1];};
  set.circle = function() {return this[0];};

  set.current = function(after) {
    this.circle().animate({fill: "#d00"},1000);
    this.name().animate({fill: "#fff"},1000, after);
  };
  set.normal = function() {
    this[0].animate({fill: "#fff"},1000);
    this[1].animate({fill: "#000"},1000);
  };
  
  return set;
};


Raphael.fn.arc = function (from, to, symbol) {
  var box1 = from.getBBox(),
      box2 = to.getBBox(),
      center1 = [box1.x+ box1.width/2, box1.y+ box1.height/2],
      center2 = [box2.x+ box2.width/2, box2.y+ box2.height/2];
  var line = this.path("M " + center1[0] + " " + center1[1] + " L " + center2[0] + " " + center2[1]);
  var point1 = line.getPointAtLength(25),
      point2 = line.getPointAtLength(line.getTotalLength() - 25);

  line.attr({path: "M " + point1.x + " " + point1.y + " L " + point2.x + " " + point2.y });

  // Draw the symbol:
  var line_center = line.getPointAtLength(line.getTotalLength()/2),
      sym = this.text(line_center.x, line_center.y, symbol).attr({'font-size': 16});

  // Draw the arrow tip:
  var slope = (point2.y-point1.y)/(point2.x-point1.x),
      p1 = [0,0],                                             // Perpendicular line relative to origin
      p2 = [1,(-1/slope)*(1-p1[0]) + p1[1]],                  // Point in the perpendicular line
      p3 = line.getPointAtLength(line.getTotalLength() - 8);

  var dx = p2[0]-p1[0],  // Change in of perpendicular line
      dy = p2[1]-p1[1],
      dr = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2)),
      r = 2.5,
      d = p1[0]*p2[1] - p2[0]*p1[1],
      s = (dy < 0) ? -1 : 1;

  var x1 = (d*dy+s*dx*Math.sqrt(Math.pow(r,2)*Math.pow(dr,2) - Math.pow(d,2)))/Math.pow(dr,2),
      x2 = (d*dy-s*dx*Math.sqrt(Math.pow(r,2)*Math.pow(dr,2) - Math.pow(d,2)))/Math.pow(dr,2),
      y1 = (-d*dx+Math.abs(dy)*Math.sqrt(Math.pow(r,2)*Math.pow(dr,2) - Math.pow(d,2)))/Math.pow(dr,2),
      y2 = (-d*dx-Math.abs(dy)*Math.sqrt(Math.pow(r,2)*Math.pow(dr,2) - Math.pow(d,2)))/Math.pow(dr,2);
  var tip = this.path("M " + p3.x + " " + p3.y + " m " + x1 + " " + y1 + "L " + point2.x + " " + point2.y +
            "M " + p3.x + " " + p3.y + " m " + x2 + " " + y2 + "L " + point2.x + " " + point2.y).attr({'stroke-width': 2});
  sym.translate(x2*5,y2*5);

  return this.set(line,symbol,tip);
};

Raphael.fn.loop = function (from, symbol) {
    // Draw the symbol:
    var box1 = from.getBBox();
    var center1 = [box1.x+ box1.width/2, box1.y+ box1.height/2];
    var line = this.path("M " + center1[0] + "," + center1[1] + " C "
                    + (center1[0]-50) + "," + (center1[1]-80) + " " 
                    + (center1[0]+50) + "," + (center1[1]-80) + " " 
                    + center1[0] + "," + center1[1]);
    var point1 = line.getPointAtLength(25),
        point2 = line.getPointAtLength(line.getTotalLength() - 25);
    line.attr({path:     "M " + point1.x + "," + point1.y + " C "
                        + (point1.x-30) + "," + (point1.y-50) + " " 
                        + (point2.x+30) + "," + (point2.y-50) + " " 
                        + point2.x + "," + point2.y });
    var line_center = line.getPointAtLength(line.getTotalLength()/2),
                sym = this.text(line_center.x, line_center.y -20, symbol).attr({'font-size': 16});
    return this.set(line,sym);
};