/**
 * How much of a case study to show.
 *
 * Two audiences read these, and they want opposite things. Someone screening
 * forty portfolios wants the argument in ninety seconds. Someone who has
 * already decided Abhinav is interesting wants the reasoning, the trade-offs
 * and the things that went wrong. Serving one badly to serve the other is the
 * usual failure; this lets the reader say which they are.
 *
 * Quick is the default, for the honest reason: the person deciding whether to
 * keep reading is the one worth optimising for, and the full read is one tap
 * away. Every section heading stays visible in Quick, so the depth is still
 * legible even when the prose is folded — the reader can see there are
 * eighteen steps of thinking before choosing to read them.
 *
 * Remembered across studies, not per study. Someone who wants the long version
 * of Harmoney almost certainly wants it for ForeCash too, and asking them
 * again on every card is the kind of small tax that makes a site tiring.
 */
export type ReadMode = 'quick' | 'full'
const KEY = 'ak-read'

export function readMode(): ReadMode {
  if (typeof localStorage === 'undefined') return 'quick'
  try { return localStorage.getItem(KEY) === 'full' ? 'full' : 'quick' } catch { return 'quick' }
}

export function storeMode(m: ReadMode): void {
  try { localStorage.setItem(KEY, m) } catch { /* storage can be blocked */ }
}

/**
 * Whether the toggle still needs introducing.
 *
 * Two unlabelled buttons do not say that one of them is a summary, so the first
 * study someone opens gets a short explanation. Only the first: a tip that
 * fires on every study is furniture, and people learn to dismiss furniture
 * without reading it, which costs the explanation and annoys them at once.
 *
 * Storage being unavailable resolves to "already seen" rather than "show it".
 * With no way to record the dismissal, the alternative is showing the same tip
 * on every study forever, and a reader in a locked-down browser has done
 * nothing to deserve that.
 */
const SEEN = 'ak-read-hint'

export function needsModeHint(): boolean {
  try { return localStorage.getItem(SEEN) !== '1' } catch { return false }
}

export function markModeHintSeen(): void {
  try { localStorage.setItem(SEEN, '1') } catch { /* storage can be blocked */ }
}
