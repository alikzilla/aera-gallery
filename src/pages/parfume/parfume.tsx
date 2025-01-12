import { useParams } from "react-router";

const Parfume = () => {
  const { parfume_id } = useParams();

  return <section>Parfume id: {parfume_id}</section>;
};

export default Parfume;
