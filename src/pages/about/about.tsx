import React from "react";
import about from "../../assets/about.webp";
import { Container } from "../../components";
import { useTranslation } from "react-i18next";  // Import the useTranslation hook

const About: React.FC = () => {
  const { t } = useTranslation();  // Initialize the translation function

  return (
    <section className="py-10">
      <Container>
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold">{t('about.title')}</h1>
          </div>

          {/* Content Wrapper */}
          <div className="flex flex-col-reverse lg:flex-row items-start gap-10">
            {/* Text Section */}
            <div className="lg:w-[60%] space-y-4">
              <p className="text-gray-700">{t('about.intro')}</p>
              <p className="text-gray-700">{t('about.delivery')}</p>
              <p className="text-gray-700">{t('about.audience')}</p>
              <p className="text-gray-700">{t('about.closing')}</p>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-[40%]">
              <img
                src={about}
                alt={t('about.title')}
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
