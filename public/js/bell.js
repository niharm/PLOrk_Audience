// CONSTANTS
var number_of_bell_oscillators = 3;

var bell_oscillators = []; 
var gains = [],
    freqRatios = [], 
    decays = [],
    amps = [];

var currentlyPlayingBell = false;

function SetUpBells() {

    // randomly choose frequencies, gains, etc.
    var rand = Math.random();
    // first bell
    if (rand < 0.2) {
        freqRatios = [.5, 1.183, 2.0];
        amps = [.026, .394, .254];
        decays = [4.0, 1.2, .8];
    }
    // churchy bell
    else if (rand < 0.4) {
        freqRatios = [.5, 1.604, 3.620];
        amps = [.026, .015, .394];
        decays = [4.7, 2, 1.2];
    }

    // my deeper bell
    else if (rand < 0.6) {
        freqRatios = [.5, 2.9, 2];
        amps = [2.9, 0.14, 0.27];
        decays = [1.7, 1.0, 1.2];
    }

    // crotale
    else if (rand < 0.8) {
        freqRatios = [.5, 2.9, 4];
        amps = [0.16, 0.17, 0.11];
        decays = [1.0, 1.4, 1.2];
    }

    // steely bell
    else {
        freqRatios = [.5, 1.0, 2.0];
        amps = [0.95, 0.07, 0.17];
        decays = [2.7, 4.0, 2.2];
    } 

    // randomize decays a bit
    decayFactor = .5 + Math.random();
    console.log(decayFactor);
    for (var i = 0; i < decays.length; i++) {
        decays[i] = decayFactor * decays[i];
    };
    console.log(decays);

    // TODO: randomize pitch a bit?
    console.log(freqRatios);

    for(var i = 0; i < number_of_bell_oscillators; i++) {
        var o = context.createOscillator();
        o.detune.value = getRandomInInterval(-4, +4); // random detuning

        // edge case
        if (!o.start)
          o.start = o.noteOn;
        o.start(0);

        var g = context.createGain();

        // connect nodes
        o.connect(g);

        g.gain.setValueAtTime(0.0, 0);
        g.connect(context.destination);

        bell_oscillators.push(o);
        gains.push(g);

    }
}

function Bell(bellFreq, xAccel, yAccel, zAccel) {

    var combinedAccel = xAccel + yAccel + zAccel;
    var shake = xAccel * xAccel + yAccel * yAccel + zAccel * zAccel;

    var gainMult = Math.min((shake - 30.0)/150.0*(shake - 30.0)/150.0, 1.6);

    var attackTime = .01;

    for(var i = 0; i < number_of_bell_oscillators; i++) {
        
            o = bell_oscillators[i];
            g = gains[i];

            console.log(o);

            g.gain.cancelScheduledValues(context.currentTime);
            g.gain.linearRampToValueAtTime(amps[i] * gainMult, context.currentTime + attackTime);
            g.gain.linearRampToValueAtTime(0.0, context.currentTime + attackTime + decays[i]);

            console.log(decays);
            console.log(bellFreq);
            o.frequency.setValueAtTime(freqRatios[i] * bellFreq, context.currentTime);

        };

    currentlyPlayingBell = true;
    setTimeout(function(){ 
        currentlyPlayingBell = false; 
    }, 50);

};

function StopBells() {
    for(var i = 0; i < number_of_bell_oscillators; i++) {
        o = bell_oscillators[i];
        o.stop(0);    
    }
}

