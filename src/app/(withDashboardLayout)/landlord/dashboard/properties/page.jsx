import React from 'react';
import { getLandlordProperties } from '@/actions/server/properties';
import LandlordPropertyCard from '@/components/dashboard/landlords/properties/LandlordPropertyCard';
import PropertiesEmptyState from '@/components/dashboard/landlords/properties/PropertiesEmptyState';
import PropertyStats from '@/components/dashboard/landlords/properties/PropertyStats';
import PropertyStatusTabs from '@/components/dashboard/landlords/properties/PropertyStatusTabs';
import SavedBanner from '@/components/dashboard/landlords/properties/SavedBanner';
import PageHeader from '@/components/dashboard/Sharedui/PageHeader';
import { PROPERTY_STATUSES } from '@/data/dashboard/landlord-Constants';
import { Plus } from 'lucide-react';
import Link from 'next/link';


export const metadata = {
  title: "My Properties | Rentora Dashboard",
  description:
    "Manage your rental properties on Rentora. View your listings, track approval status, and update property details from your landlord dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

const Properties = async ({ searchParams }) => {

  const { saved, status } = await searchParams


  const landlodProperties = await getLandlordProperties()

  const counts = { all: landlodProperties.length };

  PROPERTY_STATUSES.forEach((s) => {
    counts[s] = landlodProperties.filter((p) => p.status === s).length;
  })


  const availableUnits = landlodProperties.filter((p) => p.status === "approved").reduce((sum, p) => sum + (p.availableUnits || 0), 0)

  const activeStatus = PROPERTY_STATUSES.includes(status) ? status : "";
  const properties = activeStatus ? landlodProperties.filter((p) => p.status === activeStatus) : landlodProperties

    return (
    <div>
      <PageHeader title="My properties" subtitle="Manage your listings, edit details and track their review status.">
        <Link href="/landlord/dashboard/properties/new" className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700">
          <Plus className="size-4" /> Add property
        </Link>
      </PageHeader>

      <SavedBanner saved={saved} />

      <div className="mb-6">
        <PropertyStats counts={counts} availableUnits={availableUnits} />
      </div>

      <div className="mb-6">
        <PropertyStatusTabs active={activeStatus} counts={counts} />
      </div>

      {properties.length === 0 ? (
        <PropertiesEmptyState filtered={Boolean(activeStatus)} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {properties.map((p) => <LandlordPropertyCard key={p._id} property={p} />)}
        </div>
      )}
    </div>
  );
};

export default Properties;