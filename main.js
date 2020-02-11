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

brush.onclick = function() {
	eraserEnabled = false;
	brush.classList.add("active");
	eraser.classList.remove("active");
};
eraser.onclick = function() {
	eraserEnabled = true;
	eraser.classList.add("active");
	brush.classList.remove("active");
};
clear.onclick = function() {
	context.clearRect(0, 0, canvas.width, canvas.height);
};

context.strokeStyle = "#ffbbff";
context.lineWidth = 5;

red.onclick = function() {
	context.strokeStyle = "#ffbbff";
	red.classList.add("active");
	green.classList.remove("active");
	blue.classList.remove("active");
};
green.onclick = function() {
	context.strokeStyle = "#b4eeb4";
	red.classList.remove("active");
	green.classList.add("active");
	blue.classList.remove("active");
};
blue.onclick = function() {
	context.strokeStyle = "#87cefa";
	red.classList.remove("active");
	green.classList.remove("active");
	blue.classList.add("active");
};

thin.onclick = function() {
	context.lineWidth = 5;
	thin.classList.add("active");
	thick.classList.remove("active");
};
thick.onclick = function() {
	context.lineWidth = 8;
	thin.classList.remove("active");
	thick.classList.add("active");
};

function listenToMouse(canvas) {
	var using = false;
	var lastPoint = { x: undefined, y: undefined };

	if (document.body.ontouchstart == undefined) {
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

	canvas.ontouchstart = function(states) {
		var x = states.touches[0].clientX;
		var y = states.touches[0].clientY;
		using = true;
		if (eraserEnabled) {
			context.clearRect(x - 5, y - 5, 10, 10);
		} else {
			lastPoint = { x: x, y: y };
		}
	};

	canvas.ontouchmove = function(states) {
		var x = states.touches[0].clientX;
		var y = states.touches[0].clientY;
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

	canvas.ontouchup = function(states) {
		using = false;
	};
}

function drawLine(x1, y1, x2, y2) {
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.stroke();
}
