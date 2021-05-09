import React from 'react';

const Navigation = () => {
    return (
         /*
         * Building sign out button with a bit css and tachyons (like bootstrap)
         */
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>

        );

};

export default Navigation;