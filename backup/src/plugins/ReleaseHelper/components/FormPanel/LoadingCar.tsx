import Car from "@/assets/car.svg";

interface LoadingCarProps {
  text: string;
}

const LoadingCar: React.FC<LoadingCarProps> = ({ text }) => {
  return (
    <div className={`${text ? "flex" : "hidden"}`}>
      <span className="show-text mr-8 font-500">{text}</span>
      <img
        src={Car}
        style={{ animationDelay: "2s" }}
        className="w-20 delay align-bottom animate-bounce"
      />
    </div>
  );
};

export default LoadingCar;
