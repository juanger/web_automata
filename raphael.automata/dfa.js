var dfa = function (_options) {
  var pub = {},
      current = _options.first || 0,
      states = _options.states || [],
      delta = _options.delta || {},
      tape = $('#' +  _options.tape),
      string = tape.html(),
      curr_sym = 0;

  // This connects every state acording to the delta function
  for (var state in delta) {
    for (var sym in delta[state]) {
      _options.canvas.arc(states[state].circle(), states[delta[state][sym]].circle(), sym);
    }
  }

  tape.tape();
  states[current].current();

  // set_current(state_idx, callback)
  pub.set_current = function (_current, after) {
    states[current].normal();
    if (_current >= 0) states[_current].current(after);
    current = _current;
  };

  pub.run = function () {
    if (curr_sym < string.length) {
      tape.tape("next");
      var sym = curr_sym;
      curr_sym++;
      if (sym == string.length - 1) {
        pub.set_current(delta[''+current][string[sym]]);
      } else {
        pub.set_current(delta[''+current][string[sym]], pub.run);
      }
    } else {
      pub.reset();
    }
  }

  pub.pause = function () {
    states[current].stop();
  }

  pub.step = function () {
    pub.set_current(delta[''+current][string[curr_sym]]);
    tape.tape("next");
    curr_sym++;
  }

  pub.reset = function () {
    pub.set_current(0);
    current = 0;
    curr_sym = 0;
    tape.tape("reset");
  }

  return pub;
};