import type { ComponentType, SVGProps } from "react";
import type { ServiceName } from "../lib/quote";

const iconStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type IconProps = SVGProps<SVGSVGElement>;

function WallsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <rect x="9" y="9" width="30" height="24" rx="2" {...iconStroke} />
      <path d="M9 19h30M19 9v24M29 9v24" {...iconStroke} />
      <path d="M15 39h18" {...iconStroke} />
    </svg>
  );
}

function CeilingsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path d="M8 12h32M12 18h24" {...iconStroke} />
      <path d="M15 29h16a4 4 0 0 0 4-4v-1" {...iconStroke} />
      <rect x="11" y="26" width="18" height="7" rx="2" {...iconStroke} />
      <path d="M20 33v8" {...iconStroke} />
    </svg>
  );
}

function TrimBaseboardsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path d="M13 9v28h25" {...iconStroke} />
      <path d="M18 14v18h19M13 37h26M19 31l-6 6" {...iconStroke} />
      <path d="M24 37v-5M31 37v-5" {...iconStroke} />
    </svg>
  );
}

function CrownMoldingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path d="M8 13h32M11 18h26M15 23h18" {...iconStroke} />
      <path d="M15 23 31 39M23 23l14 14M32 23l7 7" {...iconStroke} />
    </svg>
  );
}

function DoorsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path d="M15 41V8h20v33" {...iconStroke} />
      <path d="M20 41V13h11v28M15 41h22" {...iconStroke} />
      <circle cx="29" cy="26" r="1.4" fill="currentColor" />
    </svg>
  );
}

function AccentWallsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <rect x="9" y="9" width="22" height="30" rx="2" {...iconStroke} />
      <path d="M31 17h5a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H24a3 3 0 0 0-3 3v3" {...iconStroke} />
      <rect x="17" y="33" width="8" height="8" rx="2" {...iconStroke} />
      <path d="M14 15h12M14 21h12" {...iconStroke} />
    </svg>
  );
}

function DrywallRepairIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <rect x="9" y="10" width="18" height="20" rx="2" {...iconStroke} />
      <path d="M14 17h8M14 23h5" {...iconStroke} />
      <path d="m28 32 9-9 4 4-9 9-7 2 3-6Z" {...iconStroke} />
      <path d="m35 25 4 4" {...iconStroke} />
    </svg>
  );
}

const serviceIcons: Record<ServiceName, ComponentType<IconProps>> = {
  Walls: WallsIcon,
  Ceilings: CeilingsIcon,
  "Trim & Baseboards": TrimBaseboardsIcon,
  "Crown Molding": CrownMoldingIcon,
  Doors: DoorsIcon,
  "Accent Walls": AccentWallsIcon,
  "Small Drywall Repair": DrywallRepairIcon,
};

export default function ServiceIcon({ service, ...props }: IconProps & { service: ServiceName }) {
  const Icon = serviceIcons[service];
  return <Icon {...props} />;
}
