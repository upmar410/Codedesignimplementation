import CartoonBlueFlame from './CartoonBlueFlame';
import flameImage from "figma:asset/4467334fc5abd8fbdd05a1ddb2b54b7f14912b59.png";
import fireGif from "../assets/fire.gif";
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
const BASE_STREAK_TOP = 320;
const BASE_STREAK_HEIGHT = 235;
const BASE_STREAK_WIDTH = 295;
const BASE_STREAK_BORDER_WIDTH = 5;
const BASE_STREAK_BORDER_HEIGHT = 179;
const BASE_STREAK_BORDER_RADIUS = 27;
const BASE_COUNTER_FONT_SIZE = 52;
const BASE_STREAK_TEXT_FONT_SIZE = 15;
const BASE_STREAK_TEXT_LINE_HEIGHT = 24;
const BASE_FLAME_LEFT = 164;
const BASE_FLAME_TOP = 81;
// Position fire GIF so it aligns with the streak number (counter is at 164px, fire GIF is 240px wide)
// Position it so there's a nice gap - moved a bit to the left
// Keep vertical base the same: original bottom was at 81 + 120 = 201px
// New size is 240px, so top should be 201 - 240 = -39px to keep bottom at 201px
const BASE_FIRE_EMOJI_LEFT = -30;
const BASE_FIRE_EMOJI_TOP = -35;
const BASE_FIRE_EMOJI_SIZE = 240;
const BASE_CORNER_ICON_SIZE = 21;
const BASE_CORNER_ICON_WIDTH = 23;
const BASE_LEFT_CORNER_LEFT = 2;
const BASE_LEFT_CORNER_TOP = 6;
const BASE_RIGHT_CORNER_LEFT = 270;
const BASE_RIGHT_CORNER_TOP = 207;

export default function CompletionScreen({ onPromptMeClick, counter, scale }: CompletionScreenProps) {
  // Calculate scaled dimensions
  const SCREEN_WIDTH = BASE_WIDTH * scale;
  const SCREEN_HEIGHT = BASE_HEIGHT * scale;
  const WHITE_LINE_Y = BASE_WHITE_LINE_Y * scale;
  
  // Title dimensions (scaled) - 20% above original position
  const titleBaseTop = 111.65 * 0.8 * scale; // 20% above original
  const titlePadding = 0; // No padding between words
  
  const yourHeight = 36.705 * 0.66 * scale; // 60% of original, then +10% = 66%
  const yourWidth = 71.638 * scale;
  const yourTop = titleBaseTop;
  const yourFontSize = 25 * scale;
  
  const sketchyHeight = 66.337 * 0.66 * scale; // 60% of original, then +10% = 66%
  const sketchyWidth = 151.436 * scale;
  const sketchyTop = yourTop + yourHeight + titlePadding; // After YOUR
  const sketchyFontSize = 44 * scale;
  
  const friendHeight = 38.989 * 0.66 * scale; // 60% of original, then +10% = 66%
  const friendWidth = 94.525 * scale;
  const friendTop = sketchyTop + sketchyHeight + titlePadding; // After sketchy
  const friendFontSize = 25 * scale;
  
  // Streak badge dimensions (scaled)
  const streakTop = BASE_STREAK_TOP * scale;
  const streakHeight = BASE_STREAK_HEIGHT * scale;
  const streakWidth = BASE_STREAK_WIDTH * scale;
  const streakBorderWidth = BASE_STREAK_BORDER_WIDTH * scale;
  const streakBorderHeight = BASE_STREAK_BORDER_HEIGHT * scale;
  const streakBorderRadius = BASE_STREAK_BORDER_RADIUS * scale;
  const counterFontSize = BASE_COUNTER_FONT_SIZE * scale;
  const streakTextFontSize = BASE_STREAK_TEXT_FONT_SIZE * scale;
  const streakTextLineHeight = BASE_STREAK_TEXT_LINE_HEIGHT * scale;
  const flameLeft = BASE_FLAME_LEFT * scale;
  const flameTop = BASE_FLAME_TOP * scale;
  const fireEmojiLeft = BASE_FIRE_EMOJI_LEFT * scale;
  const fireEmojiTop = BASE_FIRE_EMOJI_TOP * scale;
  const fireEmojiSize = BASE_FIRE_EMOJI_SIZE * scale;
  const cornerIconSize = BASE_CORNER_ICON_SIZE * scale;
  const cornerIconWidth = BASE_CORNER_ICON_WIDTH * scale;
  const leftCornerLeft = BASE_LEFT_CORNER_LEFT * scale;
  const leftCornerTop = BASE_LEFT_CORNER_TOP * scale;
  const rightCornerLeft = BASE_RIGHT_CORNER_LEFT * scale;
  const rightCornerTop = BASE_RIGHT_CORNER_TOP * scale;
  
  return (
    <div className="bg-[#313d3a] overflow-clip relative rounded-[40px] size-full" data-name="iPhone 16 - 3">
      {/* Header elements - centered horizontally, scaled dynamically */}
      <div 
        className="absolute flex items-center justify-center translate-x-[-50%]" 
        style={{ 
          left: '50%',
          top: `${yourTop}px`,
          height: `${yourHeight}px`,
          width: `${yourWidth}px`,
        }}
      >
        <div className="flex-none rotate-[354.3deg]">
          <p 
            className="font-normal leading-[normal] relative text-[#e0e0e0] text-center text-nowrap"
            style={{ fontFamily: "'Golos Text', sans-serif", fontSize: `${yourFontSize}px` }}
          >
            YOUR
          </p>
        </div>
      </div>
      <div 
        className="absolute flex items-center justify-center translate-x-[-50%]" 
        style={{ 
          left: '50%',
          top: `${friendTop}px`,
          height: `${friendHeight}px`,
          width: `${friendWidth}px`,
        }}
      >
        <div className="flex-none rotate-[354.3deg]">
          <p 
            className="font-normal leading-[normal] relative text-[#e0e0e0] text-center text-nowrap"
            style={{ fontFamily: "'Golos Text', sans-serif", fontSize: `${friendFontSize}px` }}
          >
            FRIEND
          </p>
        </div>
      </div>
      <div 
        className="absolute flex items-center justify-center translate-x-[-50%]" 
        style={{ 
          left: '50%',
          top: `${sketchyTop}px`,
          height: `${sketchyHeight}px`,
          width: `${sketchyWidth}px`,
        }}
      >
        <div className="flex-none rotate-[354.303deg]">
          <p 
            className="leading-[normal] not-italic relative text-[#ffd23d] text-center text-nowrap"
            style={{ fontFamily: "'Cabin Sketch', cursive, sans-serif", fontWeight: 700, fontSize: `${sketchyFontSize}px` }}
          >
            sketchy
          </p>
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
      <div className="absolute left-[50%] translate-x-[-50%]" style={{ top: `${streakTop}px` }}>
        <div className="relative" style={{ height: `${streakHeight}px`, width: `${streakWidth}px` }}>
          {/* Fire GIF */}
          <div className="absolute flex items-center justify-center" style={{ 
            left: `${fireEmojiLeft}px`, 
            top: `${fireEmojiTop}px`,
            width: `${fireEmojiSize}px`,
            height: `${fireEmojiSize}px`
          }}>
            <img 
              src={fireGif} 
              alt="Fire animation" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                filter: 'hue-rotate(180deg) saturate(1.5) brightness(1.2)'
              }} 
            />
          </div>
          <div className="absolute flex flex-col items-center" style={{ left: `${flameLeft}px`, top: `${flameTop}px` }}>
            <p className="font-['Golos_Text:Bold',sans-serif] font-bold leading-[normal] text-nowrap text-white" style={{ fontSize: `${counterFontSize}px` }}>{counter}</p>
            <p className="font-['Golos_Text:Regular',sans-serif] font-normal text-nowrap text-white" style={{ fontSize: `${streakTextFontSize}px`, lineHeight: `${streakTextLineHeight}px` }}>{counter <= 1 ? 'sketch streak' : 'sketch streak'}</p>
          </div>
          <div className="absolute border-[#ffd23d] border-solid shadow-[0px_4px_26px_3px_rgba(0,0,0,0.45)] left-0" style={{ 
            borderWidth: `${streakBorderWidth}px`,
            height: `${streakBorderHeight}px`,
            borderRadius: `${streakBorderRadius}px`,
            top: `${28 * scale}px`,
            width: `${streakWidth}px`
          }} />
          <div className="absolute" style={{ 
            height: `${cornerIconSize}px`,
            left: `${leftCornerLeft}px`,
            top: `${leftCornerTop}px`,
            width: `${cornerIconWidth}px`
          }}>
            <div className="absolute inset-[-116.67%_-113.04%_-142.86%_-123.91%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.5 75.5">
                <g filter="url(#filter0_d_18_763)" id="Rectangle 7">
                  <path d={svgPaths.p2204980} stroke="var(--stroke-0, #FFD23D)" strokeWidth={5 * scale} />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="75.5" id="filter0_d_18_763" width="77.5" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy={4 * scale} />
                    <feGaussianBlur stdDeviation={13 * scale} />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_18_763" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_18_763" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
          <div className="absolute flex items-center justify-center" style={{ 
            height: `${cornerIconSize}px`,
            left: `${rightCornerLeft}px`,
            top: `${rightCornerTop}px`,
            width: `${cornerIconWidth}px`
          }}>
            <div className="flex-none rotate-[180deg]">
              <div className="relative" style={{ height: `${cornerIconSize}px`, width: `${cornerIconWidth}px` }}>
                <div className="absolute inset-[-116.67%_-113.04%_-142.86%_-123.91%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.5 75.5">
                    <g filter="url(#filter0_d_18_761)" id="Rectangle 8">
                      <path d={svgPaths.p2204980} stroke="var(--stroke-0, #FFD23D)" strokeWidth={5 * scale} />
                    </g>
                    <defs>
                      <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="75.5" id="filter0_d_18_761" width="77.5" x="0" y="0">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset dy={4 * scale} />
                        <feGaussianBlur stdDeviation={13 * scale} />
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