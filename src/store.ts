import { BehaviorSubject, Subject } from "rxjs";
import {
  distinctUntilChanged,
  distinctUntilKeyChanged,
  pluck,
  scan,
} from "rxjs/operators";

export class ObservableStore {
  private _store: BehaviorSubject<any>;
  private _stateUpdates: Subject<unknown>;
  constructor(initialState) {
    this._store = new BehaviorSubject(initialState);
    this._stateUpdates = new Subject();

    // acc state
    this._stateUpdates
      .pipe(
        scan((acc, curr) => {
          return { ...acc, ...curr };
        }, initialState)
      )
      .subscribe(this._store);
  }

  updateState(stateUpdates) {
    this._stateUpdates.next(stateUpdates);
  }

  selectState(stateKey) {
    return this._store.pipe(distinctUntilKeyChanged(stateKey), pluck(stateKey));
  }

  stateChanges() {
    return this._store.asObservable();
  }
}
