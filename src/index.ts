import {
  interval,
  of,
  queueScheduler,
  defer,
  timer,
  SchedulerLike,
  forkJoin,
  asapScheduler,
} from "rxjs";
import { async } from "rxjs/internal/scheduler/async";
import { AsyncScheduler } from "rxjs/internal/scheduler/AsyncScheduler";
import {
  delay,
  switchMap,
  tap,
  flatMap,
  map,
  repeat,
  delayWhen,
  concatMap,
  take,
  observeOn,
  subscribeOn,
} from "rxjs/operators";

const myPromise = (val) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000)
  );

/*
  when all observables complete, give the last
  emitted value from each as an array
*/
const example = forkJoin({
  //emit 'Hello' immediately
  sourceOne: of("Hello"),
  //emit 'World' after 1 second
  sourceTwo: of("World").pipe(delay(1000)),
  //emit 0 after 1 second
  sourceThree: interval(1000).pipe(take(1)),
  //emit 0...1 in 1 second interval
  sourceFour: interval(1000).pipe(take(2)),
  //promise that resolves to 'Promise Resolved' after 5 seconds
  sourceFive: myPromise("RESULT"),
});
/*
 * Output:
 * {
 *   sourceOne: "Hello",
 *   sourceTwo: "World",
 *   sourceThree: 0,
 *   sourceFour: 1,
 *   sourceFive: "Promise Resolved: RESULT"
 * }
 */
example.pipe(observeOn(async)).subscribe((val) => {
  debugger;
});
