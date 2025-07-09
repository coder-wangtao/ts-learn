type OnFulfilled<V> = (value: V) => V | Promise<V>;
type OnRejected = (error: any) => any;

interface Interceptor<V> {
  OnFufilled?: OnFulfilled<V>;
  onRejected?: OnRejected;
}

class AxiosInterceptorManager<V> {
  public interceptors: Array<Interceptor<V> | null> = [];
  use(OnFufilled: OnFulfilled<V>, onRejected?: OnRejected): number {
    this.interceptors.push({
      OnFufilled,
      onRejected,
    });
    return this.interceptors.length - 1;
  }
  eject(id: number) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }
}

export default AxiosInterceptorManager;
