import { useSignalEffect } from '@preact/signals'

export default function Star({
  spin,
  index,
  timeout,
  transition,
}: {
  spin?: boolean
  index: number
  timeout: number
  transition: number
}) {
  const starClass = 'star-' + index
  const x = Math.floor(Math.random() * 500)
  const y = Math.floor(Math.random() * 1000)
  const xpos = x % 2 === 0 ? '-' : ''
  const ypos = y % 2 === 0 ? '-' : ''
  function generateY() {
    if (y % 2 === 0) {
      return `${ypos}${y - 125}`
    }
    return `${y + 125}`
  }
  useSignalEffect(() => {
    if (!spin) return
    const star = document.querySelector('.' + starClass) as HTMLDivElement
    star.style.transform = `translateY(${ypos}${y}px) translateX(${xpos}${x}px)`
    setTimeout(() => {
      const s = document.querySelector('.' + starClass) as HTMLDivElement
      s.style.transform = `translateY(${generateY()}px) translateX(${xpos}${x}px)`
    }, timeout)
  })

  return (
    <div
      class={'absolute ' + starClass}
      style={{ transitionDuration: transition + 'ms' }}
    >
      ⭐
    </div>
  )
}
