class Queue<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  public enqueue(item: T): void {
    this.items.push(item);
  }

  public dequeue(): T {
    return this.items.shift();
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  get last(): T {
    return this.items[this.items.length - 1];
  }
}

export default Queue;
