import { BiWorld } from "react-icons/bi";
import { FaTruck, FaRegCreditCard} from "react-icons/fa";
import { HiOutlineRefresh } from "react-icons/hi";
import CardFeature from "./CardFeature";

const featuresData = [
  {
    id: 1,
    icon: FaTruck,
    title: "Envío gratis",
    description: "En todos nuestros productos a partir de 5.000$",
  },
  {
    id: 2,
    icon: HiOutlineRefresh,
    title: "Devoluciones",
    description: "Devuelve tu compra dentro de 72 horas desde la entrega",
  },
  {
    id: 3,
    icon: FaRegCreditCard,
    title: "Medio de pago",
    description: "Aceptamos todos los medios de pago más populares",
  },
];

export const Features = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 px-6 py-12 sm:flex-row sm:flex-wrap sm:gap-12 lg:justify-center">
      {featuresData.map((feature) => (
        <CardFeature
          key={feature.id}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default Features;
