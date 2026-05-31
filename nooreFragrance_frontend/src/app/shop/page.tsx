import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import ShopFilter from '@/components/shop/shopFilter';
import ShopItems from '@/components/shop/shopitems';
import React from 'react';

const ShopPage = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col lg:flex-row gap-8 max-w-[95%] mx-auto px-4">
                <div className="lg:sticky lg:top-24 lg:self-start">
                    <ShopFilter />
                </div>
                <div className="flex-1">
                    <ShopItems />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ShopPage;