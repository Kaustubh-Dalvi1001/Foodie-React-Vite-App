import { CDN_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const RestCard = ({ restData }) => {
  return restData.length === 0 ? (
    <Shimmer />
  ) : (
    restData.map((singleResto) => {
      const {
        name,
        avgRating,
        cuisines,
        areaName,
        locality,
        id,
        sla,
        cloudinaryImageId,
      } = singleResto?.card?.card?.info;
      return (
        <div id="singleCard" key={id}>
          <Link to={`/resturants/${id}`} id="RestoLink">
            <img
              src={CDN_URL + cloudinaryImageId}
              alt="Resturant image"
              id="rest_img"
            />
            <b>{name}</b>
            <label>{`⭐ ${avgRating} . ${sla?.slaString}`}</label>
            <label>{cuisines.join(", ")}</label>
            <label>{`${areaName}, ${locality}`}</label>
          </Link>
        </div>
      );
    })
  );
};

export default RestCard;
