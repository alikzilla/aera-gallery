import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <nav aria-label="breadcrumb" className="mb-6">
          <ol className="list-reset flex">
            <li className="mr-2">
              <a href="/" className="text-blue-500 hover:underline">
                Главная
              </a>
            </li>
            <li>/</li>
            <li className="ml-2 text-gray-500">О компании</li>
          </ol>
        </nav>
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <div className="slider-gallery">
              <div className="overflow-hidden relative">
                <div className="flex">
                  <img
                    className="w-full h-auto object-cover"
                    src="DALL·E 2025-01-14 00.26.34 - A minimalist and aesthetic design for a perfume website, featuring a luxurious glass perfume bottle surrounded by delicate, colorful flowers in soft p (1).webp"
                    alt="Слайд 1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Текст справа */}
          <div className="w-full md:w-1/2 pl-8">
            <h1 className="text-4xl font-bold mb-8">О компании</h1>
            <div className="text-lg text-gray-700 leading-relaxed">
              <p className="mb-4">
                «Парфюмист» – это не о магазине. «Парфюмист» – это о душе. Ведь
                именно в ней живет то, что делает нас самими собой – чувства.
              </p>
              <p className="mb-4">
                Настоящие, неподдельные ароматы создаются лучшими парфюмерами так,
                будто это произведения искусства, а они – художники. Уникальные и
                неповторимые техники, сочетания идеально дополняющих друг друга
                ингредиентов.
              </p>
              <p className="mb-8">
                Именно такие ароматы лучших художников со всего мира и собирает
                «Парфюмист». И собирает их именно для вас.
              </p>
              <p>
                Мы – галерея запахов. Только мы не просто выставляем их напоказ. У
                нас понравившиеся произведения ароматного искусства можно купить.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
