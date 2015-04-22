var noiseMotion;

function startNoiseMotion() {

	// Position Variables
	var dax = 0;
	var day = 0;
	var daz = 0;
	var previousAx = 0,
		previousAy = 0,
		previousAz = 0;

	// Accelerations
	var delay = 50;

	noiseMotion = setInterval(function() {

		dax = previousAx - ax;
		day = previousAy - ay;
		daz = previousAz - az;

		previousAx = ax;
		previousAy = ay;
		previousAz = az;

		// check shake 
		var shake = dax * dax + day * day + daz * daz;
		
		// converts colors on a scale from 40 (black) to 240 (almost white) in colors
		// 40 = 0%, 240 = 80% 
		var shakeLightness = Math.min(parseInt(80*(shake - 40)/200), 80);
		$('.colors').css('background-color',  "hsl(0, 0%, " + shakeLightness + "%)");


		if (shake > 35) {

			console.log(shakeLightness);
			console.log($('.colors').css('background-color'));
			Noise(Math.abs(dax), Math.abs(day), Math.abs(daz));


		}

	}, delay);


};


function stopNoiseMotion() {
	clearInterval(noiseMotion);
}