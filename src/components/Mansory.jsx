import GridDistortion from "../Bits/Distortion";
import heroBg from "../assets/Hero.jpg";

export default function ArchitectureMasonry() {
  return (
    <GridDistortion
      imageSrc={heroBg}
      grid={100}
      mouse={0.4}
      strength={0.05}
      relaxation={0.9}
    />
  );
}
