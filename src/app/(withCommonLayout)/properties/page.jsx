import React from 'react';
import { getProperties } from '@/actions/server/properties';
import PageHeader from '@/components/properties/PageHeader';
import PropertyFilters from '@/components/properties/PropertyFilters';
import TypeTabs from '@/components/properties/TypeTabs';
import PropertyGrid from '@/components/properties/PropertyGrid';
import Pagination from '@/components/properties/Pagination';


export const metadata = {
    title: "Properties",
    description: "Find apartments, houses, rooms, offices and more on Rentora.",
};

const page = async ({ searchParams}) => {

    const filters = await searchParams;


    const { data, page , totalProperties } = await getProperties(filters);

    const totalPages = Math.ceil(totalProperties / 9)

    return (
        <div>
            <main className="min-h-screen bg-stone-50">
                <PageHeader total={totalProperties} />
                <div className="mx-auto max-w-6xl px-4 pb-16">
                    <PropertyFilters filters={filters} />
                    <TypeTabs filters={filters} />        
                    <PropertyGrid properties={data} />                   
                    <Pagination filters={filters} page={page} totalPages={totalPages} />
                   
                </div>
            </main>
        </div>
    );
};

export default page;