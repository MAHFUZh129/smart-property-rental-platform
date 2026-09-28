import React from 'react';
import { getProperties } from '@/actions/server/properties';
import PageHeader from '@/components/properties/PageHeader';


export const metadata = {
  title: "Properties",
  description: "Find apartments, houses, rooms, offices and more on Rentora.",
};

const page = async({ searchParams }) => {

     const filters = await searchParams;
 
     //   const { properties, total, page, totalPages } = await getProperties(filters);
     const {data} = await getProperties();



    return (
        <div>
            <main className="min-h-screen bg-stone-50">
                <PageHeader total={data.length} />

                {/* <div className="mx-auto max-w-6xl px-4 pb-16">
                    <PropertyFilters filters={filters} />
                    <PropertyGrid properties={properties} />
                    <Pagination filters={filters} page={page} totalPages={totalPages} />
                </div> */}
            </main>
        </div>
    );
};

export default page;