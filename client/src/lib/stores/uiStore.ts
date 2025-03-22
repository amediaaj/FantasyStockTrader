import { makeAutoObservable } from "mobx";

export class UiStore {
    ticker: string | undefined = undefined;
    isLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    isBusy() {
        this.isLoading = true;
    }

    isIdle() {
        this.isLoading = false;
    }

    setTicker(newTicker: string | undefined) {
        this.ticker = newTicker;
    }
}