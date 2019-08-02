/**
 * tools
 */
export function sleep(time: number): Promise<unknown> {
  return new Promise((resolve, reject): void => {
    setTimeout(resolve, time || 1000);
  });
}
