import { useEffect, useRef } from 'react'
import type { Project } from '@/data/projects'
import { go } from '@/site/router'

/**
 * The reference's horizontal scroll row.
 *
 * Ultra-smooth, continuous infinite horizontal scroll track with viscous damping
 * momentum physics. Mouse wheel, trackpad, and pointer drag glide seamlessly across
 * case studies without hitching, boundary walls, or requiring Shift.
 */
export function Gallery({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const posRef = useRef(0)
  const velocityRef = useRef(0)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartYRef = useRef(0)
  const dragStartPosRef = useRef(0)
  const lastPointerXRef = useRef(0)
  const lastPointerTimeRef = useRef(0)
  const hasDraggedRef = useRef(false)

  // Tripled items to create a continuous infinite loop without boundaries
  const loopItems = [...projects, ...projects, ...projects]

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    // Position in the center set so scrolling left or right loops infinitely
    const initPosition = () => {
      if (el && el.scrollWidth > 0) {
        const segment = el.scrollWidth / 3
        if (posRef.current === 0) {
          el.scrollLeft = segment
          posRef.current = segment
        }
      }
    }

    initPosition()
    const timer = window.setTimeout(initPosition, 80)

    // Translate standard vertical/horizontal wheel into smooth viscous momentum
    const onWheel = (e: WheelEvent) => {
      if (!el) return
      e.preventDefault()

      const rawDelta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      // Normalize wheel ticks vs trackpad high-frequency pulses
      const factor = e.deltaMode === 1 ? 25 : e.deltaMode === 2 ? 200 : 0.85
      velocityRef.current += (rawDelta * factor) * 0.35
      // Cap maximum velocity for silky smooth gliding
      velocityRef.current = Math.max(-60, Math.min(60, velocityRef.current))
    }

    el.addEventListener('wheel', onWheel, { passive: false })

    // High-performance RAF physics loop with friction damping
    let animationId: number
    let lastTimestamp = performance.now()

    const loop = (timestamp: number) => {
      const dt = Math.min((timestamp - lastTimestamp) / 16.667, 2.0)
      lastTimestamp = timestamp

      if (el && !isDraggingRef.current) {
        const segment = el.scrollWidth / 3

        if (segment > 0) {
          if (Math.abs(velocityRef.current) > 0.05) {
            posRef.current += velocityRef.current * dt
            // Exponential viscous decay (0.92 per standard 60fps frame)
            velocityRef.current *= Math.pow(0.92, dt)

            // Seamless cyclic wrapping
            if (posRef.current >= segment * 2) {
              posRef.current -= segment
            } else if (posRef.current <= segment * 0.2) {
              posRef.current += segment
            }

            el.scrollLeft = posRef.current
          } else {
            velocityRef.current = 0
            posRef.current = el.scrollLeft
          }
        }
      }

      animationId = requestAnimationFrame(loop)
    }

    animationId = requestAnimationFrame(loop)

    return () => {
      clearTimeout(timer)
      el.removeEventListener('wheel', onWheel)
      cancelAnimationFrame(animationId)
    }
  }, [])

  // Pointer drag interactions for smooth click-and-throw with drag threshold
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    dragStartXRef.current = e.clientX
    dragStartYRef.current = e.clientY
    dragStartPosRef.current = posRef.current
    lastPointerXRef.current = e.clientX
    lastPointerTimeRef.current = performance.now()
    hasDraggedRef.current = false
    isDraggingRef.current = false
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1 || !trackRef.current) return
    const dx = e.clientX - dragStartXRef.current
    const dy = e.clientY - dragStartYRef.current

    // Only engage drag if moved beyond threshold
    if (!isDraggingRef.current) {
      if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
        isDraggingRef.current = true
        hasDraggedRef.current = true
        velocityRef.current = 0
        try {
          trackRef.current.setPointerCapture(e.pointerId)
        } catch {}
      } else {
        return
      }
    }

    const now = performance.now()
    const frameDx = e.clientX - lastPointerXRef.current
    const dt = now - lastPointerTimeRef.current
    if (dt > 0) {
      velocityRef.current = -(frameDx / dt) * 16.667
    }
    lastPointerXRef.current = e.clientX
    lastPointerTimeRef.current = now

    const segment = trackRef.current.scrollWidth / 3
    posRef.current = dragStartPosRef.current - dx
    if (segment > 0) {
      if (posRef.current >= segment * 2) {
        posRef.current -= segment
        dragStartPosRef.current -= segment
      } else if (posRef.current <= segment * 0.2) {
        posRef.current += segment
        dragStartPosRef.current += segment
      }
    }
    trackRef.current.scrollLeft = posRef.current
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current && trackRef.current) {
      try {
        trackRef.current.releasePointerCapture(e.pointerId)
      } catch {}
    }
    isDraggingRef.current = false
    // Reset hasDragged after click event fires
    window.setTimeout(() => {
      hasDraggedRef.current = false
    }, 50)
  }

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="flex snap-x snap-mandatory gap-6 overflow-x-auto [scroll-behavior:auto] [scroll-snap-type:none] pb-6 pt-2 px-4 sm:px-8
                 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {loopItems.map((p, index) => (
        <article
          key={`${p.slug}-${index}`}
          data-card
          className="w-[min(320px,72vw)] min-w-0 shrink-0"
        >
          <button
            onClick={() => {
              if (!hasDraggedRef.current) {
                go(`/projects/${p.slug}`)
              }
            }}
            className="group block w-full min-w-0 text-left cursor-pointer"
            aria-label={`Open the ${p.name} case study`}
          >
            <div
              className="lift aspect-[4/5] w-full overflow-hidden rounded-(--radius-card) bg-(--surface) border border-(--line)"
              aria-hidden="true"
            >
              {p.thumb && (
                <img
                  src={p.thumb}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              )}
            </div>
            <div className="mt-3 flex min-w-0 items-baseline justify-between gap-2">
              <span className="t-body-sm text-(--ink) font-normal truncate">{p.name}</span>
              <span aria-hidden="true" className="text-(--ink-muted) text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </div>
            <p className="t-body-sm mt-1 line-clamp-2 text-(--ink-muted)">{p.summary}</p>
          </button>
        </article>
      ))}
    </div>
  )
}
