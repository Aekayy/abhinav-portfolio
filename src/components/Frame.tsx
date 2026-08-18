/**
 * An image slot that is honest when it is empty.
 *
 * Every image on this site is something Abhinav will drop in later, so a frame
 * has to work in both states. With a file it shows the image; without one the
 * panel and its label stay, so a missing asset reads as "not added yet" rather
 * than as a broken page. Nothing here ever renders a torn icon.
 */
export function Frame({
  src, alt, ratio = '4/3', label, rounded = true, className = '',
}: {
  src?: string; alt: string; ratio?: string; label?: string; rounded?: boolean; className?: string
}) {
  return (
    <figure className={`min-w-0 ${className}`}>
      <div
        className={`relative w-full overflow-hidden border border-(--line) bg-(--surface)
                    ${rounded ? 'rounded-(--radius-card)' : 'rounded-(--radius-sm)'}`}
        style={{ aspectRatio: ratio }}
      >
        {src && (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        )}
        {label && (
          <span className="t-caption pointer-events-none absolute bottom-3 left-3 text-(--ink-muted)">
            {label}
          </span>
        )}
      </div>
      {alt && !label && <figcaption className="sr-only">{alt}</figcaption>}
    </figure>
  )
}

/** A round portrait for a person. Falls back to their initials. */
export function Avatar({ src, name, size = 40 }: { src?: string; name: string; size?: number }) {
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('')
  return (
    <span
      className="relative grid shrink-0 place-items-center overflow-hidden rounded-full
                 border border-(--line) bg-(--surface-2) text-(--ink-muted)"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className="t-caption font-medium">{initials}</span>
      {src && (
        <img
          src={src}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
      )}
    </span>
  )
}
