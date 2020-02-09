var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

resize();

listenToMouse(canvas);

function resize() {
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	window.onresize = function() {
		var data = context.getImageData(0, 0, canvas.width, canvas.height);
		resize();
		context.putImageData(data, 0, 0);
	};
}

var eraserEnabled = false;
var actions = document.getElementById("actions");
var eraser = document.getElementById("eraser");
var brush = document.getElementById("brush");
eraser.onclick = function() {
	eraserEnabled = true;
	actions.className = "actions-2";
};
brush.onclick = function() {
	eraserEnabled = false;
	actions.className = "actions-1";
};

function listenToMouse(canvas) {
	var using = false;
	var lastPoint = { x: undefined, y: undefined };

	canvas.onmousedown = function(states) {
		var x = states.clientX;
		var y = states.clientY;
		using = true;
		if (eraserEnabled) {
			context.clearRect(x - 5, y - 5, 10, 10);
		} else {
			lastPoint = { x: x, y: y };
		}
	};

	canvas.onmousemove = function(states) {
		var x = states.clientX;
		var y = states.clientY;
		if (!using) {
			return;
		}
		if (eraserEnabled) {
			context.clearRect(x - 5, y - 5, 10, 10);
		} else {
			var newPoint = { x: x, y: y };
			drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
			lastPoint = newPoint;
		}
	};

	canvas.onmouseup = function(states) {
		using = false;
	};
}

function drawLine(x1, y1, x2, y2) {
	context.beginPath();
	context.strokeStyle = "black";
	context.lineWidth = 5;
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.stroke();
}
