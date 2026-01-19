function Frame() {
  return (
    <div className="absolute bg-[rgba(255,210,61,0.21)] content-stretch flex h-[109px] items-center justify-center left-0 pb-[33px] pt-[27px] px-[18px] top-[743px] w-[393px]">
      <p className="font-['Golos_Text:Bold',sans-serif] font-bold h-[38px] leading-[normal] relative shrink-0 text-[#ffd23d] text-[28px] text-center w-[161px]">PromptMe</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex gap-[19px] items-center justify-center left-1/2 pl-[12px] pr-[32px] py-[12px] rounded-[60px] top-[330px] translate-x-[-50%]">
      <div aria-hidden="true" className="absolute border-4 border-solid border-white inset-0 pointer-events-none rounded-[60px]" />
      <div className="bg-[#41f6ff] rounded-[50px] shrink-0 size-[69px]" />
      <p className="font-['Golos_Text:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[52px] text-nowrap text-white">100</p>
    </div>
  );
}

export default function IPhone() {
  return (
    <div className="bg-[#313d3a] overflow-clip relative rounded-[40px] size-full" data-name="iPhone 16 - 3">
      <div className="absolute flex h-[36.705px] items-center justify-center left-[187.5px] top-[111.65px] translate-x-[-50%] w-[71.638px]" style={{ "--transform-inner-width": "72.234375", "--transform-inner-height": "29" } as React.CSSProperties}>
        <div className="flex-none rotate-[354.3deg]">
          <p className="font-['Golos_Text:Regular',sans-serif] font-normal leading-[normal] relative text-[#e0e0e0] text-[25px] text-center text-nowrap">YOUR</p>
        </div>
      </div>
      <div className="absolute flex h-[38.989px] items-center justify-center left-[198.26px] top-[169px] translate-x-[-50%] w-[94.525px]" style={{ "--transform-inner-width": "93.046875", "--transform-inner-height": "29" } as React.CSSProperties}>
        <div className="flex-none rotate-[354.3deg]">
          <p className="font-['Golos_Text:Regular',sans-serif] font-normal leading-[normal] relative text-[#e0e0e0] text-[25px] text-center text-nowrap">FRIEND</p>
        </div>
      </div>
      <div className="absolute flex h-[66.337px] items-center justify-center left-[200.71px] top-[124.2px] translate-x-[-50%] w-[151.436px]" style={{ "--transform-inner-width": "149.171875", "--transform-inner-height": "50.5" } as React.CSSProperties}>
        <div className="flex-none rotate-[354.303deg]">
          <p className="font-['Cabin_Sketch:Bold',sans-serif] leading-[normal] not-italic relative text-[#ffd23d] text-[44px] text-center text-nowrap">sketchy</p>
        </div>
      </div>
      <div className="absolute h-0 left-[50px] top-[743px] w-[307px]">
        <div className="absolute inset-[-7px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 307 7">
            <line id="Line 1" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="7" x1="3.5" x2="303.5" y1="3.5" y2="3.5" />
          </svg>
        </div>
      </div>
      <Frame />
      <Frame1 />
    </div>
  );
}