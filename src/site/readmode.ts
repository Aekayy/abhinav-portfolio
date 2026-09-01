/**
 * How much of a case study to show.
 *
 * Two audiences read these and they want opposite things. Someone screening
 * forty portfolios wants the argument in ninety seconds; someone who has
 * already decided Abhinav is interesting wants the reasoning, the trade-offs
 * and the things that went wrong. Serving one badly to serve the other is the
 * usual failure, so the reader says which they are.
 *
 * Full is where every study opens, and the choice is deliberately NOT
 * remembered. That looks like a regression and is not:
 *
 * - The full write up is the work. Quick read is a courtesy for someone in a
 *   hurry, and defaulting a portfolio to its own summary is a strange thing to
 *   do to your own case studies.
 * - Remembering it meant one impatient tap on Harmoney silently shortened
 *   every study opened afterwards, including ones the reader had all the time
 *   in the world for. The setting is per study by nature; treating it as a
 *   profile preference was the mistake.
 *
 * So there is no storage here at all, and no state that outlives the panel.
 * The type is all that is left.
 */
export type ReadMode = 'quick' | 'full'
