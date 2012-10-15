var pda = function (_options) {
  var pub = {},
      current = _options.first || 0,
      states = _options.states || [],
      delta = _options.delta || {},
      tape = $('#' +  _options.tape),
      stack = $('#' + _options.stack)
      string = tape.html(),
      transitions = {},
      curr_sym = 0;

  // This connects every state acording to the delta function
  for (var state in delta) {
    transitions[state] = {};
    for (var pair in delta[state]) {
      var tag = pair + ":" + delta[state][pair][1]
      var toState = delta[state][pair][0]
      if (transitions[state][toState]) {
          transitions[state][toState] += "; " + tag;
      } else {
          transitions[state][toState] = tag;
      }
    }
  }

  for (var state in transitions) {
      for (var to in transitions[state]) {
            if (state == to) {
                _options.canvas.loop(states[state].circle(), transitions[state][to]);
            } else {
                _options.canvas.arc(states[state].circle(), states[to].circle(), transitions[state][to]);
            }
      };
  }

  tape.tape();
  stack.stack();
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
    var tapeSym = string[curr_sym];
    var stackSym = stack.stack("pop");
    var pair = delta[''+current][tapeSym + "," + stackSym];
    pub.set_current(pair[0]);
    tape.tape("next");
    for (var i = pair[1].length - 1; i >= 0; i--){
        if (pair[1][i] == "ε") {
            continue;
        } else {
            stack.stack("push", pair[1][i]);
        }
    };
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