import { FC } from "react";
import { useParams } from "react-router-dom";

export const WeatherDetails: FC = () => {
  const { city } = useParams();
  return (
    <div>
      <h1>{city} Details</h1>
    </div>
  );
};
