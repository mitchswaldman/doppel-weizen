var doppelFontSize = 150
project.currentStyle = {
	fillColor : 'black',
	strokeColor : 'black',
	strokeWidth: 0,
	fontFamily : 'Montserrat',
	fontSize : doppelFontSize
}

// Text

var doppelText = new PointText(new Point(view.center));
doppelText.content = 'DOP   EL';
doppelText.justification = 'center';

var backwardsP = new PointText({
	point : new Point(view.center),
	content : '  P   ',
	justification : 'center'
});
backwardsP.scale(-1, 1, doppelText.point + new Point(33, 0));

var weizenText = new PointText({
	point : new Point(doppelText.point) + new Point(10, doppelText.bounds.height/4),
	content : 'WEIZEN',
	fontSize : doppelFontSize/3
});
weizenText.rotate(90, weizenText.bounds.topLeft);

var stemOffset = new Point(16, 0);
var stemExtension = new Path.Rectangle(weizenText.bounds.topLeft - stemOffset, weizenText.bounds.bottomCenter - stemOffset - new Point(10, 0));

// Shapes
var yellowRect = new Path.Rectangle(new Point(-500, doppelText.bounds.bottomLeft.y - stemOffset.x), new Point(stemExtension.bounds.topLeft.x - stemOffset.x, view.bounds.bottomCenter.y + 500));
yellowRect.fillColor = '#FFF700';

var blueRect = new Path.Rectangle(new Point(stemExtension.bounds.bottomLeft) + new Point(0, 16), new Point(weizenText.bounds.bottomRight)  + new Point(0, 300));
blueRect.fillColor = '#00C4FF';

var redRect = new Path.Rectangle(
	new Point(yellowRect.bounds.topRight.x + stemOffset.x + stemExtension.bounds.width + weizenText.bounds.width, doppelText.bounds.bottomLeft.y - stemOffset.x), 
	view.bounds.bottomRight + new Point(500, 500));
redRect.fillColor = '#FE0000';

var greyRect = new Path.Rectangle(new Point(stemExtension.bounds.topLeft.x, -500), 
	new Point(view.bounds.topRight.x + 500, doppelText.bounds.topRight.y));
greyRect.fillColor = '#FAFAEE';

var circleRadius = 55;
var yellowCircle1 = new Path.Circle({
	center : new Point(yellowRect.bounds.topRight.x - circleRadius, doppelText.bounds.topLeft.y - circleRadius),
	radius : circleRadius,
	fillColor : '#FFF700'
})
var yellowCircle2 = new Path.Circle({
	center : new Point(yellowRect.bounds.topRight.x - circleRadius, doppelText.bounds.topLeft.y - 3.5 * circleRadius),
	radius : circleRadius,
	fillColor : '#FFF700'
})
var yellowCircle3 = new Path.Circle({
	center : new Point(yellowRect.bounds.topRight.x - circleRadius, doppelText.bounds.topLeft.y - 6 * circleRadius),
	radius : circleRadius,
	fillColor : '#FFF700'
})

// Plants
function createPlant(bottomCenter, layers) {
	var plantGroup = new Group();
	var horizontalReflectioVector = new Point(-1, 1);
	var scale = .3;
	var handleIn = new Point(-10 * scale, 30 * scale);
	var handleOut = new Point(50 * scale, 15 * scale);
	var center = new Point(bottomCenter.x, bottomCenter.y);
	var leafOffset = new Point(80 * scale, -60 * scale);
	for (i = 0; i < layers; i++) {
		// right leaf
		var firstPoint = center;
		var firstSegment = new Segment(firstPoint, null, handleOut);

		var secondPoint = center + leafOffset;
		var secondSegment = new Segment(secondPoint, handleIn, handleOut * -1);

		var thirdPoint = center;
		var thirdSegment = new Segment(thirdPoint, handleIn * -1, null);

		var rightLeafPath = new Path(firstSegment, secondSegment, thirdSegment);
		rightLeafPath.fillColor = '#FFF700';
		// left leaf
		firstSegment = new Segment(firstPoint, null, handleOut * horizontalReflectioVector);
		
		secondPoint = center + leafOffset * horizontalReflectioVector
		secondSegment = new Segment(secondPoint, handleIn * horizontalReflectioVector, handleOut * horizontalReflectioVector * -1)

		thirdSegment = new Segment(thirdPoint, handleIn*horizontalReflectioVector * -1, null);

		var leftLeafPath = new Path(firstSegment, secondSegment, thirdSegment)
		leftLeafPath.fillColor = '#FFF700';

		plantGroup.addChild(rightLeafPath);
		plantGroup.addChild(leftLeafPath);

		center += new Point(0, leafOffset.y * 1.2);
	}
	// top leaf
	var top = new Path.Circle({
		center : center,
		radius : leafOffset.x/5,
		fillColor : '#FFF700'
	})
	top.scale(.4, 3, top.bottomCenter)
	plantGroup.addChild(top);
	return plantGroup;
}


// Group
var plantGroup1 = createPlant(yellowRect.bounds.topCenter + new Point(160, 0), 10);
var plantGroup2 = createPlant(greyRect.bounds.bottomCenter, 5);
plantGroup2.rotate(180, plantGroup2.bounds.bottomCenter);
var plantGroup3 = createPlant(redRect.bounds.topLeft + new Point(doppelText.bounds.size.width/2, 0), 6);

var textGroup = new Group();
textGroup.addChild(plantGroup1);
textGroup.addChild(plantGroup2);
textGroup.addChild(plantGroup3);
textGroup.addChild(doppelText);
textGroup.addChild(weizenText);
textGroup.addChild(backwardsP);
textGroup.addChild(stemExtension);
textGroup.addChild(yellowRect);
textGroup.addChild(blueRect);
textGroup.addChild(redRect);
textGroup.addChild(greyRect);
textGroup.addChild(yellowCircle1);
textGroup.addChild(yellowCircle2);
textGroup.addChild(yellowCircle3);
textGroup.rotate(-31, view.center);

var blackFrame = new Path.Rectangle({
	from : view.bounds.topLeft + new Point(20, 20), 
	to : view.bounds.bottomRight - new Point(20, 20),
	fillColor : null,
	strokeWidth : 3,
	strokeColor: 'black'
})



