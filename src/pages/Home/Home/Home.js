import React from 'react';
import HomeBanner from '../HomeBanner/HomeBanner';
import HomeCategories from '../HomeCategories/HomeCategories';
import HomeFlashsale from '../HomeFlashsale/HomeFlashsale';
import AllProducts from '../../AllProducts/AllProducts';
import HowToUseSection from '../../HowToUseSection/HowToUseSection';
import About from '../../About/About';

const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <HomeFlashsale></HomeFlashsale>
            <HomeCategories></HomeCategories>
            <HowToUseSection></HowToUseSection>
            <About></About>
        </div>
    );
};

export default Home;