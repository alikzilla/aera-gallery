import Container from "../container/container";
import logo from "../../assets/logoM.png";
import Button from "../button/button";

const Hero = () => {
  const handlePerfumesLook = () => {
    window.scrollTo({
      top: (document.getElementById("catalog")?.offsetTop || 0) - 60,
      behavior: "smooth",
    });
  };

  return (
    <section className="flex items-center justify-center py-[70px]">
      <Container>
        <div className="w-full flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-10">
          <div className="flex flex-col items-start gap-1">
            <img src={logo} alt="logo" className="w-[150px] md:w-[200px]" />
            <h1 className="text-4xl md:text-5xl text-wrap">
              место где ароматы <br />
              <span className="font-georg">оживляют мечты</span>
            </h1>
            <Button className="mt-2" onClick={() => handlePerfumesLook()}>
              Посмотреть ароматы
            </Button>
          </div>
          <div className="relative w-full max-w-[700px]">
            <img
              src={
                "https://irfe.com/wp-content/uploads/2024/04/A-collection-of-the-expensive-perfumes-for-women-displayed-on-a-luxurious-vanity-1300x743.jpg"
              }
              alt="hero background"
              className="w-full md:h-[400px] object-cover rounded-xl"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
