import { asyncScheduler, from, fromEvent, interval, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  audit,
  auditTime,
  debounce,
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  first,
  map,
  mapTo,
  mergeAll,
  mergeMap,
  pluck,
  reduce,
  sample,
  sampleTime,
  scan,
  startWith,
  take,
  takeUntil,
  takeWhile,
  tap,
  throttle,
  throttleTime,
} from "rxjs/operators";

// el's
const progressBar: HTMLElement = document.querySelector(".progress-bar");
const textInput: HTMLElement = document.getElementById("text-input");
const countdown: HTMLElement = document.getElementById("countdown");
const message: HTMLElement = document.getElementById("message");

const scroll$ = fromEvent(document, "scroll");
const click$ = fromEvent<MouseEvent>(document, "click");
const input$ = fromEvent<InputEvent>(textInput, "keyup");
const timer$ = interval(1000);

const progress$ = scroll$.pipe(
  throttleTime(30, asyncScheduler, {
    leading: false,
    trailing: true,
  }),
  // percent-progress
  map(({ target }: any) => calculateScrollPercent(target.documentElement)),
  tap(console.log)
);

progress$.subscribe((percent) => {
  progressBar.style.width = `${percent}%`;
});

// helpers
function calculateScrollPercent(el) {
  const { scrollTop, scrollHeight, clientHeight } = el;

  return (scrollTop / (scrollHeight - clientHeight)) * 100;
}

// ------------------------------- //

const nums = [1, 2, 3, 4, 5];
const user = [
  { name: "Brain", loggedIn: false, token: null },
  { name: "Brain", loggedIn: true, token: "abc" },
  { name: "Brain", loggedIn: true, token: "123" },
];
const counter$ = interval(1000);

// Reduce
const totalReducer = (acc, current) => {
  return acc + current;
};
from(nums).pipe(reduce(totalReducer));
// .subscribe(console.log);

// Scan
const state$ = from(user).pipe(
  scan((acc, current) => {
    return { ...acc, ...current };
  })
);

// Map
const name$ = state$.pipe(map((state) => state.name));

// MapTo, Scan, Tap, Filter
counter$.pipe(
  mapTo(-1),
  scan((acc, current) => {
    return acc + current;
  }, 10),
  tap(console.log),
  filter((v) => v >= 0)
);
// .subscribe((v) => {
//   countdown.innerHTML = `${v}`;
//   if (!v) {
//     message.innerHTML = "Liftoff!";
//   }
// });

// Take
from(nums).pipe(take(3));
// .subscribe({
//   next: console.log,
//   complete: () => console.log("Complete!"),
// });

// First
click$.pipe(
  map((event: MouseEvent) => ({
    x: event.clientX,
    y: event.clientY,
  })),
  // filter, take(1)
  first(({ y }) => y > 200)
);
// .subscribe({
//   next: console.log,
//   complete: () => console.log("Complete!"),
// });

// Take While
click$.pipe(
  map((event: MouseEvent) => ({
    x: event.clientX,
    y: event.clientY,
  })),
  takeWhile(({ y }) => y <= 200),
  take(2)
);
// .subscribe({
//   next: console.log,
//   complete: () => console.log("Complete!"),
// });

counter$.pipe(
  mapTo(-1),
  tap(console.log),
  scan((acc, current) => {
    console.log(acc);
    return acc + current;
  }, 6),
  takeWhile((v) => v >= 0)
);
// .subscribe((v) => {
//   countdown.innerHTML = `${v}`;
//   if (!v) {
//     message.innerHTML = "Liftoff!";
//   }
// });

// Take Until
counter$.pipe(takeUntil(click$));
//   .subscribe({
//   next: console.log,
//   complete: () =>
//     console.log("%c Complete!", "color: green; font-weight: 700;"),
// });

// DistinctUntilChanged
const source$ = from([
  { name: "Brian" },
  { name: "Joe" },
  { name: "Joe" },
  { name: "Sue" },
]);
source$
  // so booring ...
  .pipe(distinctUntilChanged((prev, { name }) => name === prev.name));
// .subscribe(console.log);
source$
  // custom compare based on name property
  .pipe(distinctUntilKeyChanged("name"));
// .subscribe(console.log);

// Debounce && DebounceTime
click$.pipe(debounceTime(1000), pluck("target", "value"));
input$.pipe(
  debounceTime(1000),
  pluck("target", "value"),
  distinctUntilChanged()
);
// .subscribe(console.log);
input$.pipe(
  debounce(() => interval(1000)),
  pluck("target", "value"),
  distinctUntilChanged()
);
// .subscribe((v) => console.log("the original ", v));

// ThrottleTime
click$.pipe(throttleTime(3000));
// .subscribe(console.log);

// Sample && SampleTime
click$.pipe(
  sampleTime(4000),
  map(({ clientX, clientY }) => ({ clientX, clientY }))
);
// .subscribe(console.log);
timer$.pipe(sample(click$)).subscribe(console.log);

// Audit & AuditTime
click$.pipe(
  auditTime(4000),
  map(({ clientX, clientY }) => ({ clientX, clientY }))
);

// MergeMap & MergeAll & ajax
input$.pipe(
  debounceTime(1000),
  mergeMap((e) => {
    const term = e.target.value;
    return ajax.getJSON(`https://api.github.com/users/${term}`);
  })
  // mergeAll() // not a mergeMap
);
// .subscribe(console.log);
