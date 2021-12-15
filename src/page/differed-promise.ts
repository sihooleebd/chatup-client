export default class DifferedPromise<T> {
  public promise;
  public resolve;
  public reject;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    })
  }
}