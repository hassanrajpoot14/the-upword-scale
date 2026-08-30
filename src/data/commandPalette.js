import {
  Briefcase,
  FolderKanban,
  Layers,
  Mail,
  Phone,
  Copy,
  Sun,
  Moon,
  Home,
} from "lucide-react";
import { CONTACT_INFO } from "./contactInfo";

/** Static command definitions — actions resolved at runtime in CommandPalette */
export function buildCommandGroups({
  isDarkMode,
  onNavigate,
  onCopyEmail,
  onToggleTheme,
  onOpenBooking,
}) {
  return [
    {
      id: "pages",
      label: "Pages",
      items: [
        {
          id: "page-home",
          label: "Home",
          hint: "Landing page",
          icon: Home,
          keywords: ["home", "start", "landing"],
          action: () => onNavigate("/"),
        },
        {
          id: "page-services",
          label: "Services",
          hint: "Capabilities catalog",
          icon: Briefcase,
          keywords: ["services", "capabilities", "offerings"],
          action: () => onNavigate("/services"),
        },
        {
          id: "page-case-studies",
          label: "Case Studies",
          hint: "Proof & results",
          icon: FolderKanban,
          keywords: ["case", "studies", "portfolio", "work"],
          action: () => onNavigate("/case-studies"),
        },
        {
          id: "page-architecture",
          label: "Architecture",
          hint: "Web architecture & development",
          icon: Layers,
          keywords: ["architecture", "web", "engineering", "nextjs"],
          action: () => onNavigate("/services/web-development"),
        },
        {
          id: "page-about",
          label: "About",
          hint: "Studio & principles",
          icon: Layers,
          keywords: ["about", "studio", "team"],
          action: () => onNavigate("/about"),
        },
        {
          id: "page-blogs",
          label: "Blogs",
          hint: "Journal & articles",
          icon: FolderKanban,
          keywords: ["blog", "blogs", "articles", "journal", "insights"],
          action: () => onNavigate("/blogs"),
        },
        {
          id: "page-contact",
          label: "Contact",
          hint: "Project planner & intake",
          icon: Mail,
          keywords: ["contact", "email", "reach", "planner"],
          action: () => onNavigate("/contact"),
        },
      ],
    },
    {
      id: "quick-actions",
      label: "Quick Actions",
      items: [
        {
          id: "action-discovery-call",
          label: "Book Call",
          hint: "Open the scheduling panel",
          icon: Phone,
          keywords: ["book", "call", "discovery", "meeting", "schedule", "15"],
          action: onOpenBooking,
        },
        {
          id: "action-copy-email",
          label: "Copy Direct Email",
          hint: CONTACT_INFO.email,
          icon: Copy,
          keywords: ["copy", "email", "clipboard", "direct"],
          action: onCopyEmail,
        },
        {
          id: "action-toggle-theme",
          label: "Toggle Light / Dark Mode",
          hint: isDarkMode ? "Switch to light mode" : "Switch to dark mode",
          icon: isDarkMode ? Sun : Moon,
          keywords: [
            "theme",
            "light",
            "dark",
            "mode",
            "appearance",
            "toggle",
            "color",
          ],
          action: onToggleTheme,
        },
      ],
    },
  ];
}
