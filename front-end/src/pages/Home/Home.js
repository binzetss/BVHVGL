import React from "react";
import Slider from "../../components/Slider/HomeSlider";
import BookingSection from "../../components/BookingSection/BookingSection";
import WhyChoose from "../../components/WhyChoose/WhyChoose";
import ServiceSection from "../../components/ServiceSection/ServiceSection";
import EquipmentSection from "../../components/EquipmentSection/EquipmentSection";
import SpecialtySection from "../../components/SpecialtySection/SpecialtySection";
import NewsSection from "../../components/NewsSection/NewsSection";
import CustomerSection from "../../components/CustomerSection/CustomerSection";



export default function Home() {
  return (
    <div>
      <Slider />
      <BookingSection />
      <WhyChoose/>
      <ServiceSection/>
      <EquipmentSection/>
      <SpecialtySection/>
      <NewsSection/>
      <CustomerSection/>
    </div>
  );
}
