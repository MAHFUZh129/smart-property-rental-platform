import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar></Navbar>
            <main className="min-h-[90vh]">
                {children}
            </main>
           <Footer></Footer>
        </div>
    );
};

export default Layout;