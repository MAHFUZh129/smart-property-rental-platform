import { BarChart3, Building2, ClipboardList, CreditCard, FileSignature, GalleryHorizontalEnd, HousePlus, LayoutDashboard, MessageSquare, Settings, Star, Users } from "lucide-react";

const NAV_BY_ROLE = {
    tenant: [
        { label: "Dashboard Overview", href: "/tenant/dashboard", icon: LayoutDashboard },
        { label: "Browse Properties", href: "/properties", icon: GalleryHorizontalEnd },
        { label: "My Rental Requests", href: "/tenant/dashboard/rental-requests", icon: ClipboardList },
        { label: "My Leases", href: "/tenant/dashboard/leases", icon: FileSignature },
        { label: "Payments", href: "/tenant/dashboard/payments", icon: CreditCard },
        { label: "Messages & Notifications", href: "/tenant/dashboard/messages", icon: MessageSquare },
        { label: "My Reviews", href: "/tenant/dashboard/reviews", icon: Star },
        { label: "Settings", href: "/tenant/dashboard/settings", icon: Settings },
    ],


    landlord: [
        { label: "Dashboard Overview", href: "/landlord/dashboard", icon: LayoutDashboard },
        { label: "Add New Property", href: "/landlord/dashboard/properties/new", icon: HousePlus },
        { label: "My Properties", href: "/landlord/dashboard/properties", icon: Building2 },
        { label: "Rental Requests", href: "/landlord/dashboard/requests", icon: ClipboardList },
        { label: "Tenants", href: "/landlord/dashboard/currentTenants", icon: Users },
        { label: "Reviews", href: "/landlord/dashboard/reviews", icon: Star },
        { label: "Messages & Notifications", href: "/landlord/dashboard/messages", icon: MessageSquare },
        { label: "Settings", href: "/landlord/dashboard/settings", icon: Settings },
    ],


    admin: [
        { label: "Dashboard Overview", href: "/admin/dashboard", icon: LayoutDashboard },
        { label: "Property Management", href: "/admin/dashboard/properties", icon: Building2 },
        { label: "Users Management", href: "/admin/dashboard/users", icon: Users },
        // { label: "Rental Requests", href: "/dashboard/requests", icon: ClipboardList },
        { label: "Reports & Analytics", href: "/admin/dashboard/reports", icon: BarChart3 },
        { label: "Messages & Notifications", href: "/admin/dashboard/messages", icon: MessageSquare },
        { label: "Platform Settings", href: "/dashboard/settings", icon: Settings },
    ],
};


export const getNavItems = (role) => {

    return NAV_BY_ROLE[role] || NAV_BY_ROLE.tenant
}