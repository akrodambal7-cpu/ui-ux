/**
 * icons.jsx
 * Inline SVG icons extracted from all 8 Repito Figma SVGs
 */

const Icon = ({ children, size = 18, strokeWidth = 1.8, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

export const MailIcon = (props) => (
  <Icon {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <polyline points="3,6 12,13 21,6" />
  </Icon>
);

export const LockIcon = (props) => (
  <Icon {...props}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </Icon>
);

export const EyeIcon = (props) => (
  <Icon {...props}>
    <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" />
    <circle cx="12" cy="12" r="2.8" />
  </Icon>
);

export const EyeOffIcon = (props) => (
  <Icon {...props}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </Icon>
);

export const SparkleIcon = ({ size = 18, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M15.5 1.5V4.5M14 3H17" />
    <path d="M9 2L11 7.5L16.5 9.5L11 11.5L9 17L7 11.5L1.5 9.5L7 7.5L9 2Z" />
  </svg>
);

export const ArrowUpRightIcon = ({ size = 14, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M2 12L12 2M3.5 2H12V10.5" />
  </svg>
);

export const ArrowLeftIcon = (props) => (
  <Icon {...props} strokeWidth={2}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </Icon>
);

export const HomeIcon = (props) => (
  <Icon {...props}>
    <path d="M3 10l9-7 9 7v10a1.5 1.5 0 0 1-1.5 1.5H15v-6h-6v6H4.5A1.5 1.5 0 0 1 3 20V10z" />
  </Icon>
);

export const UtensilsIcon = (props) => (
  <Icon {...props}>
    <path d="M4 3v5a3 3 0 0 0 6 0V3M7 3v18" />
    <path d="M17 3v18M17 3c2 1.5 3 4 3 7h-3" />
  </Icon>
);

export const CalendarIcon = (props) => (
  <Icon {...props}>
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="3" x2="8" y2="6.5" />
    <line x1="16" y1="3" x2="16" y2="6.5" />
  </Icon>
);

export const UsersIcon = (props) => (
  <Icon {...props}>
    <path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="3.5" />
    <path d="M22 20v-2a3.5 3.5 0 0 0-2.5-3.3" />
    <path d="M15.5 3.7a3.5 3.5 0 0 1 0 6.6" />
  </Icon>
);

export const HelpCircleIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M9.5 9.5a2.5 2.5 0 0 1 4.8.8c0 1.6-2.3 2.2-2.3 3.7" />
    <circle cx="12" cy="17.2" r="0.6" fill="currentColor" stroke="none" />
  </Icon>
);

export const PlusIcon = (props) => (
  <Icon {...props} strokeWidth={2.2}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </Icon>
);

export const SearchIcon = (props) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="7" />
    <line x1="20" y1="20" x2="16.2" y2="16.2" />
  </Icon>
);

export const PencilIcon = (props) => (
  <Icon {...props}>
    <path d="M12 20h9" strokeOpacity="0" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </Icon>
);

export const TrashIcon = (props) => (
  <Icon {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </Icon>
);

export const CameraIcon = (props) => (
  <Icon {...props}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </Icon>
);

export const StarIcon = ({ size = 16, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const RefreshIcon = (props) => (
  <Icon {...props}>
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </Icon>
);

export const ChevronRightIcon = (props) => (
  <Icon {...props} strokeWidth={2}>
    <polyline points="9 6 15 12 9 18" />
  </Icon>
);

export const CheckIcon = ({ size = 14, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <polyline points="2 7.5 5.5 11 12 3.5" />
  </svg>
);

export const MenuIcon = (props) => (
  <Icon {...props}>
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </Icon>
);

export const XIcon = (props) => (
  <Icon {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Icon>
);

export const LogOutIcon = (props) => (
  <Icon {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </Icon>
);
