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
                Мы — команда, которая вдохновляется миром нишевой парфюмерии и
                стремится сделать его ближе к вам. В нашем магазине вы найдете
                только оригинальные ароматы от лучших мировых брендов — как на
                распив, так и в полном объеме.
              </p>
              <p className="text-gray-700">
                Мы доставляем ароматы от уникальных композиций по всему
                Казахстану в течение 3 дней, а по странам СНГ — до 15 дней.
                Более 5000 клиентов доверили нам свои ароматы, и это доверие
                вдохновляет нас становиться лучше каждый день.
              </p>
              <p className="text-gray-700">
                Наши ароматы выбирают уверенные мужчины и женщины, которые знают
                цену стилю и индивидуальности. Мы здесь, чтобы помочь вам
                подчеркнуть вашу уникальность и оставить незабываемый след в
                памяти окружающих.
              </p>
              <p className="text-gray-700">
                Ваш аромат — ваша история. Давайте создадим её вместе.
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
