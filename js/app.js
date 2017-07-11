view.rotate(-31);
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
var yellowRect = new Path.Rectangle(new Point(-500, doppelText.bounds.bottomLeft.y - stemOffset.x), new Point(stemExtension.bounds.topLeft.x - stemOffset.x, view.bounds.bottomCenter.y + 100));
yellowRect.fillColor = '#FFF700';

var blueRect = new Path.Rectangle(new Point(stemExtension.bounds.bottomLeft) + new Point(0, 16), new Point(weizenText.bounds.bottomRight)  + new Point(0, 300));
blueRect.fillColor = '#00C4FF';

var redRect = new Path.Rectangle(
	new Point(yellowRect.bounds.topRight.x + stemOffset.x + stemExtension.bounds.width + weizenText.bounds.width, doppelText.bounds.bottomLeft.y - stemOffset.x), 
	view.bounds.bottomRight + new Point(100, 100));
redRect.fillColor = '#FE0000';

var greyRect = new Path.Rectangle(new Point(stemExtension.bounds.topLeft.x, -100), 
	new Point(view.bounds.topRight.x + 100, doppelText.bounds.topRight.y));
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
var plantGroup3 = createPlant(new Point(plantGroup2.position.x + 2* plantGroup2.bounds.size.width, redRect.bounds.topCenter.y), 6);

var leafBoundsWidth = plantGroup1.children[0].bounds.size.width;
var topLeafBoundsHeight = plantGroup1.children[plantGroup1.children.length - 1].bounds.size.height;
var shrinkLeaf = function(item, idx) {
	item.scale(.01);
}
plantGroup1.children.forEach(shrinkLeaf)
plantGroup2.children.forEach(shrinkLeaf)
plantGroup3.children.forEach(shrinkLeaf)

var blackFrame = new Path.Rectangle({
	from : view.bounds.topLeft + new Point(20, 20), 
	to : view.bounds.bottomRight - new Point(20, 20),
	fillColor : null,
	strokeWidth : 3,
	strokeColor: 'black'
});
blackFrame.rotate(31);

var endingSizes = {
	redRect : redRect.bounds.size.clone(),
	yellowRect : yellowRect.bounds.size.clone(),
	greyRect : greyRect.bounds.size.clone(),
	blueRect : blueRect.bounds.size.clone(),
}

var circleEndingPositions = {
	yellowCircle1 : yellowCircle1.position.clone(),
	yellowCircle2 : yellowCircle2.position.clone(),
	yellowCircle3 : yellowCircle3.position.clone()
}

var rectGrowRate = 6;
redRect.bounds.size.height = 1;
yellowRect.bounds.size.height = 1;
greyRect.bounds.size.height = 1;
blueRect.bounds.size.height = 1;

var circleMoveInRate = 3;
yellowCircle1.position = new Point(yellowCircle1.position.x, -3 * circleRadius)
yellowCircle2.position = new Point(yellowCircle1.position.x, -3 * circleRadius)
yellowCircle3.position = new Point(yellowCircle1.position.x, -3 * circleRadius)

var initialAnimationFinished = {
	redRect : false,
	blueRect : false,
	yellowRect : false,
	greyRect : false,
	yellowCircle1 : false,
	yellowCircle2 : false,
	yellowCircle3 : false
}
view.onFrame = function(event) {
	//Rectangle initial animation
	if(redRect.bounds.size.height < endingSizes.redRect.height - rectGrowRate) {
		redRect.bounds.size.height += rectGrowRate;	
	} else {
		initialAnimationFinished.redRect = true
	}
	if(yellowRect.bounds.size.height < endingSizes.yellowRect.height - rectGrowRate) {
		yellowRect.bounds.size.height += rectGrowRate;
	} else {
		initialAnimationFinished.yellowRect = true
	}
	if(greyRect.bounds.size.height < endingSizes.greyRect.height - rectGrowRate) {
		greyRect.bounds.size.height += rectGrowRate;
	} else {
		initialAnimationFinished.greyRect = true
	}
	if(blueRect.bounds.size.height < endingSizes.blueRect.height - rectGrowRate) {
		blueRect.bounds.size.height += rectGrowRate/3;
	} else {
		initialAnimationFinished.blueRect = true
	}

	//Circle initial animation
	if(yellowCircle1.position.y < circleEndingPositions.yellowCircle1.y) {
		yellowCircle1.position.y += circleMoveInRate;
	} else {
		initialAnimationFinished.yellowCircle1 = true
	}
	if(yellowCircle2.position.y < circleEndingPositions.yellowCircle2.y) {
		yellowCircle2.position.y += circleMoveInRate;
	} else {
		initialAnimationFinished.yellowCircle2 = true
	}
	if(yellowCircle3.position.y < circleEndingPositions.yellowCircle3.y) {
		yellowCircle3.position.y += circleMoveInRate;
	} else {
		initialAnimationFinished.yellowCircle3 = true
	}

	// Plant animation
	if (initialAnimationFinished.redRect 
		&& initialAnimationFinished.blueRect 
		&& initialAnimationFinished.greyRect) {
		var growLeaf = function(item, idx){
			if(item.bounds.size.width < leafBoundsWidth && item.bounds.size.height < topLeafBoundsHeight) {
				item.scale(1.1);
			}
		}
		plantGroup1.children.forEach(growLeaf);
		plantGroup2.children.forEach(growLeaf);
		plantGroup3.children.forEach(growLeaf);
	}

}



