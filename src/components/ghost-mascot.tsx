function GhostMascot() {
  return (
    <div aria-hidden className='grid shrink-0 justify-items-center self-start'>
      <svg viewBox='0 0 160 140' className='ghost-mascot h-32 w-36 overflow-visible'>
        <path d='M36 64a44 44 0 0 1 88 0v42a8.8 8.8 0 0 1-17.6 0v-1a8.8 8.8 0 0 0-17.6 0v1a8.8 8.8 0 0 1-17.6 0v-1a8.8 8.8 0 0 0-17.6 0v1a8.8 8.8 0 0 1-17.6 0Z' />
        <g className='ghost-mascot-eyes'>
          <circle cx='62' cy='66' r='5.5' />
          <circle cx='98' cy='66' r='5.5' />
        </g>
      </svg>
      <span className='ghost-mascot-shadow bg-primary h-2 w-16' />
    </div>
  );
}

export { GhostMascot };
