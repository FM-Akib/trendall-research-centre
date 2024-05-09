
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import img1 from '../../assets/cover1.png';
import img2 from '../../assets/cover2.png';
import img3 from '../../assets/cover3.png';
import img4 from '../../assets/cover4.png';
import img5 from '../../assets/cover5.png';
import img6 from '../../assets/cover6.png';

const Cover = () => {
    return (
        <>
          <Swiper
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src={img5}/></SwiperSlide>
        <SwiperSlide><img src={img2}/></SwiperSlide>
        <SwiperSlide><img src={img3}/></SwiperSlide>
        <SwiperSlide><img src={img4}/></SwiperSlide>
        <SwiperSlide><img src={img1}/></SwiperSlide>
        <SwiperSlide><img src={img6}/></SwiperSlide>
       
        
      </Swiper>  
        </>
    );
};

export default Cover;