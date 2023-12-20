import React from 'react';
import { Carousel } from 'antd';
import banner_football1 from '~/assets/images/banner3.png';
import banner_football2 from '~/assets/images/banner1.png';

function Slider() {
    const contentStyle = {
        height: '450px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (
        <Carousel autoplay>
            <div>
                <h3 style={contentStyle}>
                    <img src={banner_football2} style={{ width: '100%', height: '100%' }} alt="banner2" />
                </h3>
            </div>
            <div>
                <h3 style={contentStyle}>
                    <img src={banner_football1} style={{ width: '100%', height: '100%' }} alt="banner1" />
                </h3>
            </div>
        </Carousel>
    );
}

export default Slider;
