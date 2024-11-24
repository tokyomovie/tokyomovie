import { useSignal, useSignalEffect } from '@preact/signals'
import Star from './Star.tsx'

export default function Stars({
  number,
  spin,
}: {
  number: number
  spin?: boolean
}) {
  const show = useSignal(true)
  useSignalEffect(() => {
    const stars = document.querySelector('.stars')
    stars?.classList.add('opacity-0')

    setTimeout(() => {
      console.log('ran timeout')
      show.value = false
    }, 950)
  })

  const starsArray = Array.from({ length: number }).map(() => (
    <Star spin={spin} />
  ))
  if (show.value) {
    return (
      <div
        class="stars absolute h-screen w-screen top-0 left-0 flex content-center justify-center overflow-hidden"
        style={{ transitionDuration: '2750ms' }}
      >
        <div class="flex flex-wrap gap-2 content-center items-center justify-center max-w-[38rem] min-w-[20rem] relative">
          {starsArray}
        </div>
      </div>
    )
  }
  return <></>
}
