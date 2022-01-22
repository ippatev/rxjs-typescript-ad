"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
// emit every 1s, take 2
const source$ = (0, rxjs_1.interval)(1000).pipe((0, operators_1.take)(2));
// map each emitted value from source to interval observable that takes 5 values
const example$ = source$.pipe((0, operators_1.map)(val => (0, rxjs_1.interval)(1000).pipe((0, operators_1.map)(i => `Result (${val}): ${i}`), (0, operators_1.take)(5))));
/*
  2 values from source will map to 2 (inner) interval observables that emit every 1s.
  combineAll uses combineLatest strategy, emitting the last value from each
  whenever either observable emits a value
*/
example$
    .pipe((0, operators_1.combineAll)())
    /*
    output:
    ["Result (0): 0", "Result (1): 0"]
    ["Result (0): 1", "Result (1): 0"]
    ["Result (0): 1", "Result (1): 1"]
    ["Result (0): 2", "Result (1): 1"]
    ["Result (0): 2", "Result (1): 2"]
    ["Result (0): 3", "Result (1): 2"]
    ["Result (0): 3", "Result (1): 3"]
    ["Result (0): 4", "Result (1): 3"]
    ["Result (0): 4", "Result (1): 4"]
  */
    .subscribe(console.log);
//# sourceMappingURL=combineAll.js.map