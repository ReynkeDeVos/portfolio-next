// Nested groups keep each motion on its own transform: the whole figure sways,
// the body breathes and leans into a wave, and the eyes glance, blink and
// squint happily while one arm waves hello.
function BrowserMascot() {
  return (
    <div aria-hidden className='grid shrink-0 justify-items-center self-start'>
      <svg
        viewBox='0 9 64 60'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='h-[45px] w-12 overflow-visible'
      >
        <ellipse
          cx='32'
          cy='65'
          rx='14'
          ry='2.2'
          className='browser-mascot-shadow fill-primary opacity-14'
        />
        <g className='browser-mascot-sway'>
          <g className='browser-mascot-breathe'>
            <g className='browser-mascot-lean'>
              <g className='fill-primary'>
                <path d='M24 53v6m16-6v6' strokeWidth='3.5' className='stroke-primary' />
                <ellipse cx='22.5' cy='61' rx='4' ry='2.4' />
                <ellipse cx='41.5' cy='61' rx='4' ry='2.4' />
              </g>
              <rect
                x='10'
                y='14'
                width='44'
                height='41'
                rx='13'
                strokeWidth='2'
                className='fill-primary-container stroke-primary'
              />
              <path d='M11 26h42' strokeWidth='1.5' className='stroke-primary opacity-35' />
              <g className='fill-primary'>
                <circle cx='17.5' cy='20.5' r='1.5' />
                <circle cx='22.5' cy='20.5' r='1.5' />
                <circle cx='27.5' cy='20.5' r='1.5' className='fill-tertiary' />
                <rect x='32' y='18.5' width='15' height='4' rx='2' className='opacity-25' />
              </g>
              <g className='fill-tertiary opacity-45'>
                <ellipse cx='16.5' cy='45' rx='3.2' ry='2' />
                <ellipse cx='47.5' cy='45' rx='3.2' ry='2' />
              </g>
              <g className='browser-mascot-glance'>
                <g className='browser-mascot-eyes-open'>
                  <g className='browser-mascot-blink'>
                    <g className='browser-mascot-pupils'>
                      <ellipse cx='24' cy='38' rx='4.2' ry='5' />
                      <ellipse cx='40' cy='38' rx='4.2' ry='5' />
                    </g>
                    <g className='browser-mascot-catchlights'>
                      <circle cx='22.6' cy='36.1' r='1.6' />
                      <circle cx='38.6' cy='36.1' r='1.6' />
                      <circle cx='25.4' cy='39.8' r='0.7' />
                      <circle cx='41.4' cy='39.8' r='0.7' />
                    </g>
                  </g>
                </g>
                <path
                  d='M20.5 39.5q3.5-4.5 7 0m5.5 0q3.5-4.5 7 0'
                  strokeWidth='2.25'
                  className='browser-mascot-eyes-happy'
                />
              </g>
              <path
                d='M28.75 44.5h6.5a3.25 3.25 0 0 1-6.5 0Z'
                strokeWidth='1'
                className='browser-mascot-mouth browser-mascot-pupils'
              />
              <g className='fill-primary stroke-primary'>
                <g className='browser-mascot-arm-rest'>
                  <path d='M11 39q-2.5 6-7 8.5' fill='none' strokeWidth='3.5' />
                  <circle cx='3.5' cy='48' r='3' />
                </g>
                <g className='browser-mascot-arm-sway'>
                  <g className='browser-mascot-arm-wave'>
                    <path d='M53 39q2.5 6 7 8.5' fill='none' strokeWidth='3.5' />
                    <circle cx='60.5' cy='48' r='3' />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

export { BrowserMascot };
