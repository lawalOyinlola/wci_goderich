/**
 * Deterministic shuffling.
 *
 * The gallery is paginated, so it cannot simply randomise each response: page 2
 * would be drawn from a different ordering than page 1, which shows some images
 * twice and hides others entirely. Instead the client mints one seed per visit
 * and sends it with every page request, and the server reproduces the exact
 * same ordering from that seed each time.
 */

/** xmur3 string hash, used to turn a seed string into a 32-bit integer. */
function hashSeed(seed: string): number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return (h ^= h >>> 16) >>> 0;
}

/** mulberry32: small, fast, well-distributed seeded PRNG. */
function createRandom(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Fisher-Yates shuffle driven by a seeded PRNG. Returns a new array; the same
 * seed and input always produce the same ordering.
 */
export function seededShuffle<T>(items: readonly T[], seed: string): T[] {
  const random = createRandom(hashSeed(seed));
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
