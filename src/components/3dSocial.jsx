import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaInstagram,
} from "react-icons/fa";

export default function SkewedSocialLinks() {
  const socials = [
    {
      icon: FaFacebookF,
      color: "#3b5998",
      side: "#365492",
      bottom: "#4a69ad",
    },
    {
      icon: FaTwitter,
      color: "#00aced",
      side: "#097aa5",
      bottom: "#53b9e0",
    },
    {
      icon: FaGooglePlusG,
      color: "#dd4b39",
      side: "#b33a2b",
      bottom: "#e66a5a",
    },
    {
      icon: FaInstagram,
      color: "#e4405f",
      side: "#d81c3f",
      bottom: "#e46880",
    },
  ];

  return (
    <div className="relative h-30 flex items-center justify-center bg-black overflow-hidden">
      
      {/* Left text */}
      <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 
                       text-white font-semibold tracking-wide
                       text-sm sm:text-base md:text-lg">
        Aravind
      </span>

      {/* Right text */}
      <span className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 
                       text-white font-semibold tracking-wide
                       text-sm sm:text-base md:text-lg">
        Prakash
      </span>

      {/* Social tiles */}
      <ul className="flex gap-4 md:gap-6">
        {socials.map((s, i) => {
          const Icon = s.icon;

          return (
            <li key={i}>
              <a
                href="#"
                style={{
                  "--main": s.color,
                  "--side": s.side,
                  "--bottom": s.bottom,
                }}
                className="
                  group relative block
                  w-[90px] h-[80px]
                  sm:scale-90
                  md:scale-100

                  pl-6 flex items-center gap-4
                  bg-black text-zinc-800
                  transform rotate-[-30deg] skew-x-[25deg]
                  transition-all duration-500 ease-out
                  shadow-[-20px_20px_10px_rgba(0,0,0,0.5)]

                  hover:-translate-y-[18px]
                  hover:bg-[var(--main)]
                  hover:shadow-[-20px_35px_35px_rgba(0,0,0,0.6)]

                  before:content-['']
                  before:absolute before:top-[10px] before:left-[-20px]
                  before:w-[20px] before:h-full
                  before:bg-[#b1b1b1]
                  before:skew-y-[-45deg]
                  before:transition-all duration-500
                  group-hover:before:bg-[var(--side)]

                  after:content-['']
                  after:absolute after:bottom-[-20px] after:left-[-10px]
                  after:w-full after:h-[20px]
                  after:bg-[#b1b1b1]
                  after:skew-x-[-45deg]
                  after:transition-all duration-500
                  group-hover:after:bg-[var(--bottom)]
                "
              >
                <Icon className="text-[40px] transition-colors duration-300 group-hover:text-white" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
