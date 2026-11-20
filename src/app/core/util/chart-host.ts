/** The browser lifecycle shared by chart libraries, independent of chart data and options. */
interface ResizableChart {
  resize(): void;
  dispose(): void;
}

/** Own one chart and its resize subscription while its rendered host remains the same. */
export class ChartHost<T extends ResizableChart> {
  private chart?: T;
  private element?: HTMLElement;
  private observer?: ResizeObserver;

  /** Current host for theme token reads, or undefined after disposal. */
  get host(): HTMLElement | undefined { return this.element; }

  /** Reuse the current instance or release it before initializing a replacement host. */
  ensure(host: HTMLElement, create: (host: HTMLElement) => T): T {
    if (!this.chart || this.element !== host) {
      this.dispose();
      this.element = host;
      this.chart = create(host);
      if (typeof ResizeObserver !== 'undefined') {
        this.observer = new ResizeObserver(() => this.chart?.resize());
        this.observer.observe(host);
      }
    }
    return this.chart;
  }

  /** Release browser resources; repeated cleanup is safe. */
  dispose(): void {
    this.observer?.disconnect();
    this.observer = undefined;
    this.chart?.dispose();
    this.chart = undefined;
    this.element = undefined;
  }
}
