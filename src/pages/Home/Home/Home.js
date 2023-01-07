import React from 'react';
import HomeBanner from '../HomeBanner/HomeBanner';
import HomeCategories from '../HomeCategories/HomeCategories';
import HomeFlashsale from '../HomeFlashsale/HomeFlashsale';
import HomeFlashsales from '../HomeFlashsale/HomeFlashsales';

const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <HomeFlashsale></HomeFlashsale>
            <HomeCategories></HomeCategories>
        </div>
    );
};

export default Home;