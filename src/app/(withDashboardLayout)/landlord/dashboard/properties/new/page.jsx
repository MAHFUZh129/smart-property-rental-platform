import { createProperty } from '@/actions/server/properties';
import BackToProperties from '@/components/dashboard/landlords/properties/newProperty/BackToProperties';
import PropertyForm from '@/components/dashboard/landlords/properties/newProperty/PropertyForm';
import PageHeader from '@/components/dashboard/Sharedui/PageHeader';
import { EMPTY_PROPERTY_VALUES } from '@/data/dashboard/PropertyForm';
import React from 'react';

export const metadata = {
  title: "Add a Property | Rentora Dashboard",
  description:
    "List your rental property on Rentora. Add property details, pricing, amenities, and photos to manage your rental listings easily.",
  robots: {
    index: false,
    follow: false,
  },
};

const AddProperty = () => {
  return (
    <div>
      <BackToProperties />
      <PageHeader title="Add property" subtitle="Fill in the details below to list a new property." />
      <PropertyForm
        action={createProperty}
        initialValues={EMPTY_PROPERTY_VALUES}
        submitLabel="Submit for review"
        cancelHref="/landlord/dashboard/properties"
        note="New properties are reviewed by an admin before they appear on the public site."
      />
    </div>
  );
};

export default AddProperty;