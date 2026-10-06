// Shared visual atoms for the CalmCare design: line icons, decorative blobs,
// and wave dividers. Everything is inline SVG and coloured via CSS tokens.

const STROKE_ICONS = {
  heart: (
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  video: (
    <>
      <path d="m16 13 5.22 3.48a.5.5 0 0 0 .78-.42V7.87a.5.5 0 0 0-.75-.43L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </>
  ),
  sprout: (
    <>
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
    </>
  ),
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
    </>
  ),
  brain: (
    <>
      <path d="M12 5a3 3 0 1 0-6 .13 4 4 0 0 0-2.52 5.77 4 4 0 0 0 .55 6.59A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 6 .13 4 4 0 0 1 2.52 5.77 4 4 0 0 1-.55 6.59A4 4 0 1 1 12 18Z" />
      <path d="M12 5v13" />
    </>
  ),
  message: (
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  ),
  mic: (
    <>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
      <path d="M12 18v4" />
    </>
  ),
  waves: (
    <>
      <path d="M2 7c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0" />
      <path d="M2 12c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0" />
      <path d="M2 17c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0" />
    </>
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <path d="M9 9h.01" />
      <path d="M15 9h.01" />
    </>
  ),
  star: (
    <path d="m12 3 2.3 5.6 6 .5-4.6 3.9 1.4 5.9L12 15.8 6.9 18.9l1.4-5.9L3.7 9.1l6-.5Z" />
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  clipboard: (
    <>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </>
  ),
  map: (
    <>
      <path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z" />
      <path d="M9 3v15M15 6v15" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </>
  ),
  lock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11" />
    </>
  ),
  graduation: (
    <>
      <path d="M22 10 12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </>
  ),
  moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
};

const FILLED_ICONS = {
  whatsapp: (
    <path d="M12.031 2c-5.518 0-10 4.475-10 9.993a9.96 9.96 0 0 0 1.543 5.342L2 22l4.814-1.528a9.957 9.957 0 0 0 5.217 1.487h.004c5.518 0 10-4.475 10-9.993 0-2.67-1.04-5.18-2.929-7.069A9.927 9.927 0 0 0 12.031 2zm0 18.286c-1.59 0-3.14-.424-4.502-1.23l-.323-.192-3.342 1.06 1.085-3.256-.21-.334a8.287 8.287 0 0 1-1.271-4.341c0-4.566 3.719-8.28 8.29-8.28a8.243 8.243 0 0 1 5.867 2.43 8.257 8.257 0 0 1 2.428 5.86c0 4.567-3.719 8.28-8.29 8.28zm4.542-6.195c-.249-.125-1.472-.726-1.7-.809-.228-.083-.394-.125-.56.125-.166.249-.643.809-.788.975-.145.166-.29.187-.539.062a6.788 6.788 0 0 1-2.001-1.234 7.494 7.494 0 0 1-1.385-1.724c-.145-.249-.015-.384.11-.508.112-.112.249-.29.373-.435.125-.145.166-.249.249-.415.083-.166.041-.311-.021-.435-.062-.125-.56-1.349-.768-1.847-.202-.485-.407-.419-.56-.427l-.477-.008c-.166 0-.435.062-.663.311-.228.249-.871.851-.871 2.075s.892 2.407 1.016 2.573c.125.166 1.754 2.678 4.249 3.755.594.256 1.058.409 1.42.524.597.19 1.14.163 1.569.099.479-.071 1.472-.602 1.68-1.183.208-.581.208-1.079.145-1.183-.062-.104-.228-.166-.477-.291z" />
  ),
  linkedin: (
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63c.9 0 1.63-.73 1.63-1.63s-.73-1.63-1.63-1.63z" />
  ),
};

export function Icon({ name, size = 22, strokeWidth = 1.75, className }) {
  const filled = FILLED_ICONS[name];
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...(filled
        ? { fill: "currentColor" }
        : {
            fill: "none",
            stroke: "currentColor",
            strokeWidth,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          })}
    >
      {filled || STROKE_ICONS[name] || STROKE_ICONS.message}
    </svg>
  );
}

// Picks a fitting icon for admin-editable titles; order matters
// (e.g. "Neurodiversity" must match before the generic "neuro" rule).
const ICON_RULES = [
  [/autis|neurodivers|affirm/, "star"],
  [/stutter|stammer|fluency/, "waves"],
  [/oral|\(opt\)|placement/, "smile"],
  [/tele|online|virtual/, "video"],
  [/early|toddler|milestone/, "sprout"],
  [/caregiver|parent|home/, "home"],
  [/stroke|dysarthria/, "activity"],
  [/aphasia|word finding/, "message"],
  [/neuro|cognitive|rehab/, "brain"],
  [/articulat|sound|clarity|lisp/, "mic"],
  [/individual|bespoke|personal/, "heart"],
  [/pediatric|paediatric|adult|lifespan|famil/, "users"],
];

export function iconFor(text = "") {
  const t = text.toLowerCase();
  const rule = ICON_RULES.find(([re]) => re.test(t));
  return rule ? rule[1] : "message";
}

const BLOB_PATHS = [
  "M421,327Q403,404,333,446Q263,488,184,455Q105,422,82,336Q59,250,112,180Q165,110,250,98Q335,86,393,153Q451,220,421,327Z",
  "M436,312Q399,374,345,421Q291,468,216,446Q141,424,95,357Q49,290,77,212Q105,134,180,91Q255,48,330,84Q405,120,439,185Q473,250,436,312Z",
  "M412,303Q420,356,378,394Q336,432,276,446Q216,460,166,423Q116,386,87,323Q58,260,92,199Q126,138,186,103Q246,68,309,92Q372,116,388,183Q404,250,412,303Z",
];

export function Blob({ variant = 0, className = "" }) {
  return (
    <svg
      className={`blob ${className}`}
      viewBox="0 0 500 500"
      aria-hidden="true"
      focusable="false"
    >
      <path d={BLOB_PATHS[variant % BLOB_PATHS.length]} />
    </svg>
  );
}

// Soft curve that fills with the band colour. Place above a band as-is,
// or below it with `flip`.
export function WaveDivider({ flip = false }) {
  return (
    <svg
      className={`wave-divider ${flip ? "flip" : ""}`}
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0,48 C240,88 480,8 720,36 C960,64 1200,16 1440,44 L1440,80 L0,80 Z" />
    </svg>
  );
}
