console.log('Import Base');

function matchMediaQueries(minmax: string, query: string) {
  return window.matchMedia(`(${minmax}-width: ${query})`).matches;
}

export { matchMediaQueries };
