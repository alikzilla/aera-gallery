import React from "react";
import about from "../../assets/about.webp";
import { Container } from "../../components";

const About: React.FC = () => {
  return (
    <section className="py-10">
      <Container>
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold">О компании</h1>
          </div>

          {/* Content Wrapper */}
          <div className="flex flex-col-reverse lg:flex-row items-start gap-10">
            {/* Text Section */}
            <div className="lg:w-[60%] space-y-4">
              <p className="text-gray-700">
                «Парфюмист» – это не о магазине. «Парфюмист» – это о душе. Ведь
                именно в ней живет то, что делает нас самими собой – чувства.
              </p>
              <p className="text-gray-700">
                Настоящие, неподдельные ароматы создаются лучшими парфюмерами
                так, будто это произведения искусства, а они – художники.
                Уникальные и неповторимые техники, сочетания идеально
                дополняющих друг друга ингредиентов.
              </p>
              <p className="text-gray-700">
                Именно такие ароматы лучших художников со всего мира и собирает
                «Парфюмист». И собирает их именно для вас.
              </p>
              <p className="text-gray-700">
                Мы – галерея запахов. Только мы не просто выставляем их напоказ.
                У нас понравившиеся произведения ароматного искусства можно
                купить.
              </p>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-[40%]">
              <img
                src={about}
                alt="О компании"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
