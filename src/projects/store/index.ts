import {
  asyncScheduler,
  empty,
  from,
  fromEvent,
  interval,
  Observable,
  of,
  Subject,
  pipe,
  timer,
  merge,
  combineLatest,
  forkJoin,
  BehaviorSubject,
  ReplaySubject,
  AsyncSubject,
  asapScheduler,
  range,
  animationFrameScheduler,
  queueScheduler,
} from "rxjs";
import { ajax } from "rxjs/ajax";
import { MulticastOperator } from "rxjs/internal/operators/multicast";
import {
  audit,
  auditTime,
  catchError,
  concatMap,
  debounce,
  debounceTime,
  delay,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  endWith,
  exhaustMap,
  filter,
  first,
  map,
  mapTo,
  mergeAll,
  mergeMap,
  multicast,
  mergeScan,
  pluck,
  reduce,
  refCount,
  sample,
  sampleTime,
  scan,
  share,
  startWith,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  tap,
  throttle,
  concat,
  throttleTime,
  withLatestFrom,
  mergeMapTo,
  shareReplay,
  observeOn,
  subscribeOn,
} from "rxjs/operators";

import { ObservableStore } from "./store";

// api's
const BASE_URL = "https://api.openbrewerydb.org/breweries";

// el's
const progressBar: HTMLElement = document.querySelector(".progress-bar");
const textInput: HTMLElement = document.getElementById("text-input");
const countdown: HTMLElement = document.getElementById("countdown");
const message: HTMLElement = document.getElementById("message");
const typeaheadContainer: HTMLElement = document.getElementById(
  "typeahead-container"
);
const radioButtons: any = document.querySelectorAll(".radio-option");
const loginButton: any = document.getElementById("login");
const firstNum: HTMLElement = document.getElementById("first");
const secondNum: HTMLElement = document.getElementById("second");

const timer$ = interval(1000);
const scroll$ = fromEvent(document, "scroll");
const click$ = fromEvent<MouseEvent>(document, "click");
const mousedown$ = fromEvent(document, "mousedown");
const mouseup$ = fromEvent(document, "mouseup");
const input$ = fromEvent<InputEvent>(textInput, "keyup");
const answerChange$ = fromEvent(radioButtons, "click");
const login$ = fromEvent(loginButton, "click");

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
// timer$.pipe(sample(click$)).subscribe(console.log);

// Audit & AuditTime
click$.pipe(
  auditTime(4000),
  map(({ clientX, clientY }) => ({ clientX, clientY }))
);

// MergeAll & ajax
// input$.pipe(
//   map((e) => {
//     const term = e.target.value;
//     return ajax.getJSON(`https://api.github.com/users/${term}`);
//   }),
//   debounceTime(1000),
//   mergeAll() // not a mergeMap
// );
// .subscribe(console.log);

// MergeMap
mousedown$.pipe(mergeMap(() => timer$.pipe(takeUntil(mouseup$))));
// .subscribe(console.log);

const coordinates$ = click$.pipe(
  map(({ clientX, clientY }) => ({
    x: clientX,
    y: clientY,
  }))
);
const coordinatesWithSave$ = coordinates$.pipe(
  mergeMap((coords) =>
    ajax.post(
      "https://run.mocky.io/v3/316cfccf-2e5a-474d-9946-c350896b1906",
      coords
    )
  )
);
// coordinatesWithSave$.subscribe(console.log);

// SwitchMap
input$.pipe(
  debounceTime(200),
  pluck("target", "value"),
  distinctUntilChanged(),
  switchMap((searchTerm) => {
    return ajax.getJSON(`
      ${BASE_URL}?by_name=${searchTerm}`);
  })
);
// .subscribe((res: any[]) => {
//   // update ui
//   typeaheadContainer.innerHTML = res.map((b) => b.name).join("<br>");
// });

// ConcatMap
// click$.pipe(concatMap(() => timer$.pipe(take(3)))).subscribe(console.log);
const saveAnswer = (answer) => {
  return of(`Saved ${answer}`).pipe(delay(1500));
};

answerChange$.pipe(
  pluck("target", "value"),
  concatMap((event) => saveAnswer(event))
);
// .subscribe(console.log);

// ExhaustMap
// click$.pipe(exhaustMap(() => timer$.pipe(take(3)))).subscribe(console.log);
const authenticateUser = (email, password) => {
  return ajax.post("https://reqres.in/api/login", {
    email,
    password,
  });
};
login$
  .pipe(exhaustMap(() => authenticateUser("eve.holt@reqres.in", "cityslicka")))
  .subscribe(console.log);
// CatchError
input$
  .pipe(
    debounceTime(200),
    pluck("target", "value"),
    distinctUntilChanged(),
    switchMap((searchTerm) => {
      return ajax
        .getJSON(
          `
      ${BASE_URL}?by_name=${searchTerm}`
        )
        .pipe(
          catchError((err, caught) => {
            // ignore
            return caught;
          })
        );
    })
  )
  .subscribe((res: any) => {
    // update ui
    typeaheadContainer.innerHTML = res.map((b) => b.name).join("<br>");
  });

// startWith
from(nums).pipe(startWith("a", "b", "c"), endWith("a", "b", "c"));
// .subscribe(console.log);

// Concat
// concat(timer$.pipe(take(3)), timer$.pipe(take(5))); concat imports with "rxjs" not operator
const delayed$ = empty().pipe(delay(1000));
delayed$.pipe(
  concat(
    delayed$.pipe(startWith("3...")),
    delayed$.pipe(startWith("2...")),
    delayed$.pipe(startWith("1...")),
    delayed$.pipe(startWith("Go!"))
  ),
  startWith("Get Ready?")
);
// .subscribe(console.log);

// Merge
const keyup$ = fromEvent(document, "keyup");
merge(keyup$, click$);
// .subscribe(console.log);

// CombineLatest && WithLatestFrom
combineLatest(keyup$, click$);
// .subscribe(console.log);
const keyupAsValue = (el) => {
  return fromEvent(el, "keyup").pipe(
    map((event: Event) => (event.target as HTMLInputElement).valueAsNumber)
  );
};
click$.pipe(withLatestFrom(timer$));
// .subscribe(console.log);
combineLatest(keyupAsValue(firstNum), keyupAsValue(secondNum)).pipe(
  filter(([first, second]) => {
    return !isNaN(first) && !isNaN(second);
  }),
  map(([first, second]) => first + second)
);
// .subscribe(console.log);

// ForkJoin
{
  const nums$ = of(1, 2, 3);
  const letters$ = of("a", "b", "c");
  forkJoin({
    nums: nums$,
    letters: letters$.pipe(delay(3000)),
  });
  // .subscribe(console.log);
}
const GITHUB_API_BASE = "https://api.github.com";
forkJoin({
  user: ajax.getJSON(`${GITHUB_API_BASE}/users/ippatev`),
  repo: ajax.getJSON(`${GITHUB_API_BASE}/users/ippatev/repos`),
});
// .subscribe(console.log);

/* MasterClas  */

// Subjects & Multicast & share & refCount
// const subject = new Subject();

const observer = {
  next: (val) => console.log(val),
  err: (err) => console.error(err),
  complete: () => console.log("complete!"),
};

// const subscription = subject.subscribe(observer);

// subject.next("Hello");

// const subscriptionTwo = subject.subscribe(observer);

// subject.next("World");

const interval$ = interval(1000).pipe(
  tap((v) => console.log("new interval ", v))
);
const multicastedInterval$: any = interval$.pipe(
  // multicast(() => new Subject()),
  // refCount()
  share()
);
// const connectedSub = multicastedInterval$.connect();

// interval$.subscribe(observer);
// interval$.subscribe(observer);

// interval$.subscribe(subject);

const subOne = multicastedInterval$.subscribe(observer);
const subTwo = multicastedInterval$.subscribe(observer);

setTimeout(() => {
  // connectedSub.unsubscribe();
  subOne.unsubscribe();
  subTwo.unsubscribe();
}, 0);

// BehaviorSubject
// const subject = new BehaviorSubject("Hello");

// const subscription = subject.subscribe(observer);

// const subscriptionTwo = subject.subscribe(observer);

// subject.next("World");

// setTimeout(() => {
//   subject.subscribe(observer);
// }, 3000);

// Observable Store
const store = new ObservableStore({
  user: "brian",
  isAuthenticated: false,
});

// store.selectState("user").subscribe(console.log);

store.updateState({
  user: "joe",
});

store.updateState({
  isAuthenticated: true,
});

// ReplySubject
const subject = new ReplaySubject(1);

subject.next("Hello");
subject.next("World");
subject.next("Goodbye");
// subject.subscribe(observer);

// ShareReplay
const ajax$ = ajax(`https://api.github.com/users/octocat`);
const clickReq$ = click$.pipe(mergeMapTo(ajax$), shareReplay(1, 10000));

// clickReq$.subscribe(observer);

// setTimeout(() => {
//   console.log("subscribing...");
//   clickReq$.subscribe(observer);
// }, 5000);

// AsyncSubject
const asyncSubject = new AsyncSubject();

// asyncSubject.subscribe(observer);
// asyncSubject.subscribe(observer);

asyncSubject.next("Hello");
asyncSubject.next("World");
asyncSubject.next("Goodbye");

asyncSubject.complete();

//AsyncScheduler
// const sub = asyncScheduler.schedule(console.log, 2000, "Hello World");
// sub.unsubscribe();
of(4, 5, 6).pipe(
  tap((val) => console.log("from tap ", val)),
  subscribeOn(asyncScheduler, 3000)
);
// .subscribe(observer);

// asyncScheduler.schedule(() => {
//   console.log("asyncScheduler");
// });
// queueMicrotask(() => console.log("from microtask"));
// asapScheduler.schedule(() => {
//   console.log("asapScheduler");
// });
// Promise.resolve("from promise").then(console.log);
const counter = document.getElementById("counter");
// don't use asapScheduler
range(1, 100, animationFrameScheduler);
//   .subscribe((val) => {
//   counter.innerHTML = val + "";
// });
// console.log("sync console log");

// QueueScheduler
queueScheduler.schedule(() => {
  queueScheduler.schedule(() => {
    queueScheduler.schedule(() => {
      console.log("second inner queue");
    });
    console.log("first inner queue");
  });
  console.log("first queue");
});
console.log("sync");
