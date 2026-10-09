import { BarChart3, Building2, ClipboardList, CreditCard, FileSignature, GalleryHorizontalEnd,  LayoutDashboard, MessageSquare, Settings, Star, Users } from "lucide-react";

const NAV_BY_ROLE = {
    tenant: [
        { label: "Overview", href: "/tenant/dashboard", icon: LayoutDashboard },
        { label: "Browse Properties", href: "/properties", icon: GalleryHorizontalEnd },
        { label: "My Rental Requests", href: "/tenant/dashboard/rental-requests", icon: ClipboardList },
        { label: "My Leases", href: "/tenant/dashboard/leases", icon: FileSignature },
        { label: "Payments", href: "/tenant/dashboard/payments", icon: CreditCard },
        { label: "Messages", href: "/tenant/dashboard/messages", icon: MessageSquare },
        { label: "My Reviews", href: "/tenant/dashboard/reviews", icon: Star },
        { label: "Settings", href: "/tenant/dashboard/settings", icon: Settings },
    ],


    landlord: [
        { label: "Overview", href: "/landlord/dashboard", icon: LayoutDashboard },
        { label: "My properties", href: "/landlord/dashboard/properties", icon: Building2 },
        { label: "Rental requests", href: "/landlord/dashboard/requests", icon: ClipboardList },
        { label: "Tenants", href: "/landlord/dashboard/tenants", icon: Users },
        { label: "Reviews", href: "/landlord/dashboard/reviews", icon: Star },
        { label: "Messages", href: "/landlord/dashboard/messages", icon: MessageSquare },
        { label: "Settings", href: "/landlord/dashboard/settings", icon: Settings },
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