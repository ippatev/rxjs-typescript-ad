"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const ajax_1 = require("rxjs/ajax");
const operators_1 = require("rxjs/operators");
const store_1 = require("./store");
// api's
const BASE_URL = "https://api.openbrewerydb.org/breweries";
// el's
const progressBar = document.querySelector(".progress-bar");
const textInput = document.getElementById("text-input");
const countdown = document.getElementById("countdown");
const message = document.getElementById("message");
const typeaheadContainer = document.getElementById("typeahead-container");
const radioButtons = document.querySelectorAll(".radio-option");
const loginButton = document.getElementById("login");
const firstNum = document.getElementById("first");
const secondNum = document.getElementById("second");
const timer$ = (0, rxjs_1.interval)(1000);
const scroll$ = (0, rxjs_1.fromEvent)(document, "scroll");
const click$ = (0, rxjs_1.fromEvent)(document, "click");
const mousedown$ = (0, rxjs_1.fromEvent)(document, "mousedown");
const mouseup$ = (0, rxjs_1.fromEvent)(document, "mouseup");
const input$ = (0, rxjs_1.fromEvent)(textInput, "keyup");
const answerChange$ = (0, rxjs_1.fromEvent)(radioButtons, "click");
const login$ = (0, rxjs_1.fromEvent)(loginButton, "click");
const progress$ = scroll$.pipe((0, operators_1.throttleTime)(30, rxjs_1.asyncScheduler, {
    leading: false,
    trailing: true,
}), 
// percent-progress
(0, operators_1.map)(({ target }) => calculateScrollPercent(target.documentElement)), (0, operators_1.tap)(console.log));
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
const counter$ = (0, rxjs_1.interval)(1000);
// Reduce
const totalReducer = (acc, current) => {
    return acc + current;
};
(0, rxjs_1.from)(nums).pipe((0, operators_1.reduce)(totalReducer));
// .subscribe(console.log);
// Scan
const state$ = (0, rxjs_1.from)(user).pipe((0, operators_1.scan)((acc, current) => {
    return Object.assign(Object.assign({}, acc), current);
}));
// Map
const name$ = state$.pipe((0, operators_1.map)((state) => state.name));
// MapTo, Scan, Tap, Filter
counter$.pipe((0, operators_1.mapTo)(-1), (0, operators_1.scan)((acc, current) => {
    return acc + current;
}, 10), (0, operators_1.tap)(console.log), (0, operators_1.filter)((v) => v >= 0));
// .subscribe((v) => {
//   countdown.innerHTML = `${v}`;
//   if (!v) {
//     message.innerHTML = "Liftoff!";
//   }
// });
// Take
(0, rxjs_1.from)(nums).pipe((0, operators_1.take)(3));
// .subscribe({
//   next: console.log,
//   complete: () => console.log("Complete!"),
// });
// First
click$.pipe((0, operators_1.map)((event) => ({
    x: event.clientX,
    y: event.clientY,
})), 
// filter, take(1)
(0, operators_1.first)(({ y }) => y > 200));
// .subscribe({
//   next: console.log,
//   complete: () => console.log("Complete!"),
// });
// Take While
click$.pipe((0, operators_1.map)((event) => ({
    x: event.clientX,
    y: event.clientY,
})), (0, operators_1.takeWhile)(({ y }) => y <= 200), (0, operators_1.take)(2));
// .subscribe({
//   next: console.log,
//   complete: () => console.log("Complete!"),
// });
counter$.pipe((0, operators_1.mapTo)(-1), (0, operators_1.tap)(console.log), (0, operators_1.scan)((acc, current) => {
    console.log(acc);
    return acc + current;
}, 6), (0, operators_1.takeWhile)((v) => v >= 0));
// .subscribe((v) => {
//   countdown.innerHTML = `${v}`;
//   if (!v) {
//     message.innerHTML = "Liftoff!";
//   }
// });
// Take Until
counter$.pipe((0, operators_1.takeUntil)(click$));
//   .subscribe({
//   next: console.log,
//   complete: () =>
//     console.log("%c Complete!", "color: green; font-weight: 700;"),
// });
// DistinctUntilChanged
const source$ = (0, rxjs_1.from)([
    { name: "Brian" },
    { name: "Joe" },
    { name: "Joe" },
    { name: "Sue" },
]);
source$
    // so booring ...
    .pipe((0, operators_1.distinctUntilChanged)((prev, { name }) => name === prev.name));
// .subscribe(console.log);
source$
    // custom compare based on name property
    .pipe((0, operators_1.distinctUntilKeyChanged)("name"));
// .subscribe(console.log);
// Debounce && DebounceTime
click$.pipe((0, operators_1.debounceTime)(1000), (0, operators_1.pluck)("target", "value"));
input$.pipe((0, operators_1.debounceTime)(1000), (0, operators_1.pluck)("target", "value"), (0, operators_1.distinctUntilChanged)());
// .subscribe(console.log);
input$.pipe((0, operators_1.debounce)(() => (0, rxjs_1.interval)(1000)), (0, operators_1.pluck)("target", "value"), (0, operators_1.distinctUntilChanged)());
// .subscribe((v) => console.log("the original ", v));
// ThrottleTime
click$.pipe((0, operators_1.throttleTime)(3000));
// .subscribe(console.log);
// Sample && SampleTime
click$.pipe((0, operators_1.sampleTime)(4000), (0, operators_1.map)(({ clientX, clientY }) => ({ clientX, clientY })));
// .subscribe(console.log);
// timer$.pipe(sample(click$)).subscribe(console.log);
// Audit & AuditTime
click$.pipe((0, operators_1.auditTime)(4000), (0, operators_1.map)(({ clientX, clientY }) => ({ clientX, clientY })));
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
mousedown$.pipe((0, operators_1.mergeMap)(() => timer$.pipe((0, operators_1.takeUntil)(mouseup$))));
// .subscribe(console.log);
const coordinates$ = click$.pipe((0, operators_1.map)(({ clientX, clientY }) => ({
    x: clientX,
    y: clientY,
})));
const coordinatesWithSave$ = coordinates$.pipe((0, operators_1.mergeMap)((coords) => ajax_1.ajax.post("https://run.mocky.io/v3/316cfccf-2e5a-474d-9946-c350896b1906", coords)));
// coordinatesWithSave$.subscribe(console.log);
// SwitchMap
input$.pipe((0, operators_1.debounceTime)(200), (0, operators_1.pluck)("target", "value"), (0, operators_1.distinctUntilChanged)(), (0, operators_1.switchMap)((searchTerm) => {
    return ajax_1.ajax.getJSON(`
      ${BASE_URL}?by_name=${searchTerm}`);
}));
// .subscribe((res: any[]) => {
//   // update ui
//   typeaheadContainer.innerHTML = res.map((b) => b.name).join("<br>");
// });
// ConcatMap
// click$.pipe(concatMap(() => timer$.pipe(take(3)))).subscribe(console.log);
const saveAnswer = (answer) => {
    return (0, rxjs_1.of)(`Saved ${answer}`).pipe((0, operators_1.delay)(1500));
};
answerChange$.pipe((0, operators_1.pluck)("target", "value"), (0, operators_1.concatMap)((event) => saveAnswer(event)));
// .subscribe(console.log);
// ExhaustMap
// click$.pipe(exhaustMap(() => timer$.pipe(take(3)))).subscribe(console.log);
const authenticateUser = (email, password) => {
    return ajax_1.ajax.post("https://reqres.in/api/login", {
        email,
        password,
    });
};
login$
    .pipe((0, operators_1.exhaustMap)(() => authenticateUser("eve.holt@reqres.in", "cityslicka")))
    .subscribe(console.log);
// CatchError
input$
    .pipe((0, operators_1.debounceTime)(200), (0, operators_1.pluck)("target", "value"), (0, operators_1.distinctUntilChanged)(), (0, operators_1.switchMap)((searchTerm) => {
    return ajax_1.ajax
        .getJSON(`
      ${BASE_URL}?by_name=${searchTerm}`)
        .pipe((0, operators_1.catchError)((err, caught) => {
        // ignore
        return caught;
    }));
}))
    .subscribe((res) => {
    // update ui
    typeaheadContainer.innerHTML = res.map((b) => b.name).join("<br>");
});
// startWith
(0, rxjs_1.from)(nums).pipe((0, operators_1.startWith)("a", "b", "c"), (0, operators_1.endWith)("a", "b", "c"));
// .subscribe(console.log);
// Concat
// concat(timer$.pipe(take(3)), timer$.pipe(take(5))); concat imports with "rxjs" not operator
const delayed$ = (0, rxjs_1.empty)().pipe((0, operators_1.delay)(1000));
delayed$.pipe((0, operators_1.concat)(delayed$.pipe((0, operators_1.startWith)("3...")), delayed$.pipe((0, operators_1.startWith)("2...")), delayed$.pipe((0, operators_1.startWith)("1...")), delayed$.pipe((0, operators_1.startWith)("Go!"))), (0, operators_1.startWith)("Get Ready?"));
// .subscribe(console.log);
// Merge
const keyup$ = (0, rxjs_1.fromEvent)(document, "keyup");
(0, rxjs_1.merge)(keyup$, click$);
// .subscribe(console.log);
// CombineLatest && WithLatestFrom
(0, rxjs_1.combineLatest)(keyup$, click$);
// .subscribe(console.log);
const keyupAsValue = (el) => {
    return (0, rxjs_1.fromEvent)(el, "keyup").pipe((0, operators_1.map)((event) => event.target.valueAsNumber));
};
click$.pipe((0, operators_1.withLatestFrom)(timer$));
// .subscribe(console.log);
(0, rxjs_1.combineLatest)(keyupAsValue(firstNum), keyupAsValue(secondNum)).pipe((0, operators_1.filter)(([first, second]) => {
    return !isNaN(first) && !isNaN(second);
}), (0, operators_1.map)(([first, second]) => first + second));
// .subscribe(console.log);
// ForkJoin
{
    const nums$ = (0, rxjs_1.of)(1, 2, 3);
    const letters$ = (0, rxjs_1.of)("a", "b", "c");
    (0, rxjs_1.forkJoin)({
        nums: nums$,
        letters: letters$.pipe((0, operators_1.delay)(3000)),
    });
    // .subscribe(console.log);
}
const GITHUB_API_BASE = "https://api.github.com";
(0, rxjs_1.forkJoin)({
    user: ajax_1.ajax.getJSON(`${GITHUB_API_BASE}/users/ippatev`),
    repo: ajax_1.ajax.getJSON(`${GITHUB_API_BASE}/users/ippatev/repos`),
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
const interval$ = (0, rxjs_1.interval)(1000).pipe((0, operators_1.tap)((v) => console.log("new interval ", v)));
const multicastedInterval$ = interval$.pipe(
// multicast(() => new Subject()),
// refCount()
(0, operators_1.share)());
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
const store = new store_1.ObservableStore({
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
const subject = new rxjs_1.ReplaySubject(1);
subject.next("Hello");
subject.next("World");
subject.next("Goodbye");
// subject.subscribe(observer);
// ShareReplay
const ajax$ = (0, ajax_1.ajax)(`https://api.github.com/users/octocat`);
const clickReq$ = click$.pipe((0, operators_1.mergeMapTo)(ajax$), (0, operators_1.shareReplay)(1, 10000));
// clickReq$.subscribe(observer);
// setTimeout(() => {
//   console.log("subscribing...");
//   clickReq$.subscribe(observer);
// }, 5000);
// AsyncSubject
const asyncSubject = new rxjs_1.AsyncSubject();
// asyncSubject.subscribe(observer);
// asyncSubject.subscribe(observer);
asyncSubject.next("Hello");
asyncSubject.next("World");
asyncSubject.next("Goodbye");
asyncSubject.complete();
//AsyncScheduler
// const sub = asyncScheduler.schedule(console.log, 2000, "Hello World");
// sub.unsubscribe();
(0, rxjs_1.of)(4, 5, 6).pipe((0, operators_1.tap)((val) => console.log("from tap ", val)), (0, operators_1.subscribeOn)(rxjs_1.asyncScheduler, 3000));
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
(0, rxjs_1.range)(1, 100, rxjs_1.animationFrameScheduler);
//   .subscribe((val) => {
//   counter.innerHTML = val + "";
// });
// console.log("sync console log");
// QueueScheduler
rxjs_1.queueScheduler.schedule(() => {
    rxjs_1.queueScheduler.schedule(() => {
        rxjs_1.queueScheduler.schedule(() => {
            console.log("second inner queue");
        });
        console.log("first inner queue");
    });
    console.log("first queue");
});
console.log("sync");
//# sourceMappingURL=index.js.map