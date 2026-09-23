import React from 'react';

const Layout = ({children}) => {
    return (
        <div>
            <div>navbar</div>
            {children}
        </div>
    );
};

export default Layout;