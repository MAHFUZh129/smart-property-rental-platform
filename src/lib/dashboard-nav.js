import { BarChart3, Building2, ClipboardList, CreditCard, GalleryHorizontalEnd,  LayoutDashboard, MessageSquare, Settings, Star, Users } from "lucide-react";

const NAV_BY_ROLE = {
    tenant: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { label: "Browse properties", href: "/properties", icon: GalleryHorizontalEnd },
        { label: "My rental requests", href: "/dashboard/requests", icon: ClipboardList },
        { label: "My reviews", href: "/dashboard/reviews", icon: Star },
        { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
        { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
        { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],


    landlord: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { label: "My properties", href: "/dashboard/properties", icon: Building2 },
        { label: "Rental requests", href: "/dashboard/requests", icon: ClipboardList },
        { label: "Tenants", href: "/dashboard/tenants", icon: Users },
        { label: "Reviews", href: "/dashboard/reviews", icon: Star },
        { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
        { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],


    admin: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { label: "Properties", href: "/dashboard/properties", icon: Building2 },
        { label: "Users", href: "/dashboard/users", icon: Users },
        { label: "Rental requests", href: "/dashboard/requests", icon: ClipboardList },
        { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
        { label: "Platform settings", href: "/dashboard/settings", icon: Settings },
    ],
};


export const getNavItems =(role)=>{

    return NAV_BY_ROLE[role] || NAV_BY_ROLE.tenant
}