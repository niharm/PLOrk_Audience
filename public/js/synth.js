// CONSTANTS
var number_of_synth_oscillators = 3;
var synth_oscillators = []; 
var filters = []; 
var filter_types = ["lowpass", "lowpass", "lowpass"];
var synth_gains = [];
var amp = 1.0;
var attackTime = [];
var decayTime = [];

var f_start = []
var f_end = []

function SetUpSynth() {
    for(var i = 0; i < number_of_synth_oscillators; i++) {

        // set up oscillator properties 
        var o = context.createOscillator();
        o.type = 'sawtooth';
        o.detune.value = getRandomInInterval(-12, +12) // random detuning

        // filter properties
        var f = context.createBiquadFilter();
        f.type = filter_types[i];
        f_start.push(getRandomInInterval(500, 8000));
        f_end.push(getRandomInInterval(4000, 6000));
        f.Q.value = 3;
        f.frequency = f_start[i];

        // gain properties       
        var g = context.createGain();
        g.gain.setValueAtTime(0.0, context.currentTime);
        attackTime.push(getRandomInInterval(0.2, 0.6)); // random
        decayTime.push(getRandomInInterval(0.2, 1.0)); // random

        // connect nodes
        o.connect(f);
        f.connect(g);
        g.connect(context.destination);

        // push to arrays
        synth_oscillators.push(o);
        synth_gains.push(g);
        filters.push(f);

        // start!
        if (!o.start)
          o.start = o.noteOn;
        o.start(0);
    }

}

function Synth(note, keyboardPower) {

    var gainFactor =  Math.max((keyboardPower/90) * (keyboardPower/90), 0.5);
    var attackFactor =  Math.max(((keyboardPower - 70.0)/15.0), 1.0);

    for(var i = 0; i < number_of_synth_oscillators; i++) {

            o = synth_oscillators[i];
            g = synth_gains[i];
            f = filters[i];

            console.log(o);

            o.frequency.setValueAtTime(midiToFreq(note), 0.0);

            // set up gain
            g.gain.setValueAtTime(0.0, context.currentTime);
            g.gain.setTargetAtTime(amp * gainFactor, context.currentTime, attackTime[i] * attackFactor);
            g.gain.setTargetAtTime(0.0, context.currentTime + attackTime[i] * attackFactor, decayTime[i]);

            // set up filter
            f.frequency.setValueAtTime(f_start[i], context.currentTime);
            f.frequency.setTargetAtTime(f_end[i], context.currentTime, attackTime[i]);
            f.frequency.setTargetAtTime(f_start[i], context.currentTime + attackTime[i], decayTime[i]);

    };

};