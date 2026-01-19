import CartoonBlueFlame from './CartoonBlueFlame';
import fireImage from 'figma:asset/bb1f38663f031c65403fcbdb37adbc47f38a3768.png';
import flameImage from "figma:asset/4467334fc5abd8fbdd05a1ddb2b54b7f14912b59.png";
import svgPaths from "../imports/svg-pm0cu7fk1u";

interface CompletionScreenProps {
  onPromptMeClick: () => void;
  counter: number;
  scale: number;
}

// Base dimensions
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;
const BASE_WHITE_LINE_Y = 743;

export default function CompletionScreen({ onPromptMeClick, counter, scale }: CompletionScreenProps) {
  // Calculate scaled dimensions
  const SCREEN_WIDTH = BASE_WIDTH * scale;
  const SCREEN_HEIGHT = BASE_HEIGHT * scale;
  const WHITE_LINE_Y = BASE_WHITE_LINE_Y * scale;
  return (
    <div className="bg-[#313d3a] overflow-clip relative rounded-[40px] size-full" data-name="iPhone 16 - 3">
      {/* Header elements */}
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
      
      {/* White line (ground) - scaled */}
      <div 
        className="absolute h-0" 
        style={{
          left: `${50 * scale}px`,
          top: `${WHITE_LINE_Y}px`,
          width: `${307 * scale}px`,
        }}
      >
        <div className="absolute" style={{ inset: `${-7 * scale}px 0 0 0` }}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 307 7">
            <line id="Line 1" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth={7 * scale} x1="3.5" x2="303.5" y1="3.5" y2="3.5" />
          </svg>
        </div>
      </div>
      
      {/* Streak Badge - Using imported Figma design */}
      <div className="absolute left-[50%] top-[320px] translate-x-[-50%]">
        <div className="relative h-[235px] w-[295px]">
          <div className="absolute left-[164px] top-[81px] flex flex-col items-center">
            <p className="font-['Golos_Text:Bold',sans-serif] font-bold leading-[normal] text-[52px] text-nowrap text-white">{counter}</p>
            <p className="font-['Golos_Text:Regular',sans-serif] font-normal leading-[24px] text-[15px] text-nowrap text-white">{counter <= 1 ? 'day streak' : 'days streak'}</p>
          </div>
          <div className="absolute border-[#ffd23d] border-[5px] border-solid h-[179px] left-0 rounded-[27px] shadow-[0px_4px_26px_3px_rgba(0,0,0,0.45)] top-[28px] w-[295px]" />
          <div className="absolute h-[21px] left-[2px] top-[6px] w-[23px]">
            <div className="absolute inset-[-116.67%_-113.04%_-142.86%_-123.91%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.5 75.5">
                <g filter="url(#filter0_d_18_763)" id="Rectangle 7">
                  <path d={svgPaths.p2204980} stroke="var(--stroke-0, #FFD23D)" strokeWidth="5" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="75.5" id="filter0_d_18_763" width="77.5" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="13" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_18_763" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_18_763" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
          <div className="absolute flex h-[21px] items-center justify-center left-[270px] top-[207px] w-[23px]">
            <div className="flex-none rotate-[180deg]">
              <div className="h-[21px] relative w-[23px]">
                <div className="absolute inset-[-116.67%_-113.04%_-142.86%_-123.91%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.5 75.5">
                    <g filter="url(#filter0_d_18_761)" id="Rectangle 8">
                      <path d={svgPaths.p2204980} stroke="var(--stroke-0, #FFD23D)" strokeWidth="5" />
                    </g>
                    <defs>
                      <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="75.5" id="filter0_d_18_761" width="77.5" x="0" y="0">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="13" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0" />
                        <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_18_761" />
                        <feBlend in="SourceGraphic" in2="effect1_dropShadow_18_761" mode="normal" result="shape" />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute h-[202px] left-px top-0 w-[129px]" data-name="1b34dfc0a9bf5563e0f960a24b6862db 1">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[144.51%] left-[-57.92%] max-w-none top-[-42.77%] w-[226.24%]" src={fireImage} style={{ 
                imageRendering: 'pixelated',
                mixBlendMode: 'screen',
                filter: 'hue-rotate(180deg) saturate(1.2) brightness(1.1)'
              }} />
            </div>
          </div>
        </div>
      </div>
      
      {/* PromptMe button - scaled */}
      <div 
        className="absolute bg-[rgba(255,210,61,0.21)] content-stretch flex items-center justify-center left-0 cursor-pointer" 
        style={{
          height: `${109 * scale}px`,
          paddingBottom: `${33 * scale}px`,
          paddingTop: `${27 * scale}px`,
          paddingLeft: `${18 * scale}px`,
          paddingRight: `${18 * scale}px`,
          top: `${WHITE_LINE_Y}px`,
          width: `${SCREEN_WIDTH}px`,
        }}
        onClick={onPromptMeClick}
      >
        <p 
          className="font-['Golos_Text:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#ffd23d] text-center" 
          style={{
            height: `${38 * scale}px`,
            fontSize: `${28 * scale}px`,
            width: `${161 * scale}px`,
          }}
        >
          PromptMe
        </p>
      </div>
    </div>
  );
}