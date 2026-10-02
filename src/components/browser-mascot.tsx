function BrowserMascot() {
  return (
    <div aria-hidden className='grid shrink-0 justify-items-center self-start'>
      <svg
        viewBox='0 0 64 70'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='h-12 w-11 overflow-visible'
      >
        <ellipse cx='32' cy='64' rx='13' ry='2' className='fill-primary opacity-12' />
        <g className='browser-mascot-character'>
          <path
            d='M9 36C1 31 0 42 7 42M55 36c8-5 9 6 2 6'
            strokeWidth='2'
            className='fill-primary-container stroke-primary'
          />
          <path
            d='M22 51v7m-3 0h6m17-7v7m-3 0h6'
            fill='none'
            strokeWidth='3'
            className='stroke-primary'
          />
          <rect
            x='8'
            y='12'
            width='48'
            height='42'
            rx='10'
            strokeWidth='2'
            className='fill-primary-container stroke-primary'
          />
          <path d='M9 25h46' strokeWidth='1.5' className='stroke-primary opacity-40' />
          <g className='fill-primary'>
            <circle cx='15' cy='18.5' r='1.5' />
            <circle cx='20' cy='18.5' r='1.5' />
            <circle cx='25' cy='18.5' r='1.5' />
          </g>
          <g className='fill-tertiary opacity-50'>
            <ellipse cx='15' cy='41' rx='3' ry='2' />
            <ellipse cx='49' cy='41' rx='3' ry='2' />
          </g>
          <g className='browser-mascot-eyes fill-on-primary-container'>
            <circle cx='23' cy='35' r='4.5' />
            <circle cx='41' cy='35' r='4.5' />
            <g className='fill-primary-container'>
              <circle cx='21.5' cy='33.5' r='1.3' />
              <circle cx='39.5' cy='33.5' r='1.3' />
            </g>
          </g>
          <path
            d='M28 43q4 4 8 0'
            fill='none'
            strokeWidth='1.75'
            className='stroke-on-primary-container'
          />
        </g>
      </svg>
    </div>
  );
}

export { BrowserMascot };
