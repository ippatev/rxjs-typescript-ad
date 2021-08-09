import { from, fromEvent, interval } from "rxjs";
import {
  filter,
  map,
  mapTo,
  reduce,
  scan,
  startWith,
  take,
  takeWhile,
} from "rxjs/operators";

// el's
const progressBar: HTMLElement = document.querySelector(".progress-bar");
const countdown: HTMLElement = document.getElementById("countdown");
const message: HTMLElement = document.getElementById("message");

const scroll$ = fromEvent(document, "scroll");
const progress$ = scroll$.pipe(
  // percent progress
  map(({ target }: any) => calculateScrollPercent(target.documentElement))
);

progress$.subscribe((percent) => {
  progressBar.style.width = `${percent}%`;
});

// helpers
function calculateScrollPercent(el) {
  const { scrollTop, scrollHeight, clientHeight } = el;

  return (scrollTop / (scrollHeight - clientHeight)) * 100;
}

const nums = [1, 2, 3, 4, 5];
const user = [
  { name: "Brain", loggedIn: false, token: null },
  { name: "Brain", loggedIn: true, token: "abc" },
  { name: "Brain", loggedIn: true, token: "123" },
];

const totalReducer = (acc, current) => {
  return acc + current;
};

const state$ = from(user).pipe(
  scan((acc, current) => {
    return { ...acc, ...current };
  })
);

const name$ = state$.pipe(map((state) => state.name));

const counter$ = interval(1000);

counter$
  .pipe(
    mapTo(-1),
    scan((acc, current) => {
      return acc + current;
    }, 10),
    filter((v) => v >= 0)
  )
  .subscribe((v) => {
    countdown.innerHTML = `${v}`;
    if (!v) {
      message.innerHTML = "Liftoff!";
    }
  });

counter$.subscribe(console.log);
