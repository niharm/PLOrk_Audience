var bellMotion;

function startBellMotion() {

	// Position Variables
	var dax = 0;
	var day = 0;
	var daz = 0;
	var previousAx = 0,
		previousAy = 0,
		previousAz = 0;

	// Acceleration
	var bellDelay = 10;
	var bellFrequency;

	bellMotion = setInterval(function() {

		dax = previousAx - ax;
		day = previousAy - ay;
		daz = previousAz - az;	

		previousAx = ax;
		previousAy = ay;
		previousAz = az;


		// check shake 
		var shake = dax * dax + day * day + daz * daz;

		if (shake > 30) {

			// gets tiltHue from ball.js

			if (tiltHue < 30) {
				bellFrequency = 523.25; // red, C
			}

			else if (tiltHue < 90) {
				bellFrequency = 698.46; // yellow, F
			}

			else if (tiltHue < 150) {
				bellFrequency = 587.33; // green, D
			}

			else if (tiltHue < 210) {
				bellFrequency = 783.99 // bluegreen, G
			}

			else {
				bellFrequency = 880.0; // blue, A
			}

			if (!currentlyPlayingBell) {
				Bell(bellFrequency, Math.abs(dax), Math.abs(day), Math.abs(daz));
			}
		}

	}, bellDelay);
};

function stopBellMotion() {
	clearInterval(bellMotion);
}