import {  
    Home,
    Building2,   
    Landmark,
    Warehouse,
    DoorOpen,
  
} from "lucide-react";


// nav links
export const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties", hasMenu: true },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
];

// PROPERTY_TYPES
export const PROPERTY_TYPES = [
    { label: "Apartments", href: "/properties?type=Apartment", Icon: Building2, blurb: "City living, ready to move in" },
    { label: "Houses", href: "/properties?type=House", Icon: Home, blurb: "Full homes for families" },
    { label: "Studios", href: "/properties?type=Studio", Icon: DoorOpen, blurb: "Compact and budget-friendly" },
    { label: "Villas", href: "/properties?type=Villa", Icon: Landmark, blurb: "Space, privacy, and comfort" },
    { label: "Offices", href: "/properties?type=Office", Icon: Warehouse, blurb: "Workspaces for growing teams" },
];