"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservableStore = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class ObservableStore {
    constructor(initialState) {
        this._store = new rxjs_1.BehaviorSubject(initialState);
        this._stateUpdates = new rxjs_1.Subject();
        // accumulate state
        this._stateUpdates
            .pipe((0, operators_1.scan)((acc, curr) => {
            return Object.assign(Object.assign({}, acc), curr);
        }, initialState))
            .subscribe(this._store);
    }
    updateState(stateUpdates) {
        this._stateUpdates.next(stateUpdates);
    }
    selectState(stateKey) {
        return this._store.pipe((0, operators_1.distinctUntilKeyChanged)(stateKey), (0, operators_1.pluck)(stateKey));
    }
    stateChanges() {
        return this._store.asObservable();
    }
}
exports.ObservableStore = ObservableStore;
//# sourceMappingURL=store.js.map