/** Observe a target until the owning render effect releases this subscription. */
export function observeIntersection(
  target: Element, intersect: () => void, options: IntersectionObserverInit
): () => void {
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) intersect();
  }, options);
  observer.observe(target);
  return () => observer.disconnect();
}
