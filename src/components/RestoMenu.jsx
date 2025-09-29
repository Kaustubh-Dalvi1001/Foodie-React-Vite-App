import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { FOOD_ITEM_IMG } from "../utils/constants";
import { MENU_API } from "../utils/constants";
import { useParams } from "react-router-dom";

const RestoMenu = () => {
  const [restoInfo, setRestoInfo] = useState(null); // restoInfo is set null because we dont have any value of restoInfo yet, it will be filled by an object later and we are also doing conditional rendering with the help of restoInfo as !restoInfo which is already null thats why setting null as the restoInfo's is very clear for "no data yet" for conditional rendering that an empty object.
  const [restoMenu, setRestoMenu] = useState([]); // We are not setting this stateVariable's initial value as null because we have to map it further, if we set it as null and we are mapping it then it will throw an error as null value cannot be mapped becuase after rendering the component only the data will be fetched using useEffect() and the initial value of restoMenu will be replaced with an array till then it will be relayed on its initial value, so setting the initial value as an empty object is safe for mapping.
  useEffect(() => {
    fetchMenu();
  }, []);

  const { restoId } = useParams();

  const fetchMenu = async () => {
    try {
      const data = await fetch(MENU_API(restoId));
      const jsonData = await data.json();
      setRestoInfo(jsonData?.data);
    } catch (error) {
      console.error(`Error in Fetching RestoInfo:${error} `);
    }
  };

  useEffect(() => {
    if (restoInfo?.cards) {
      const regularCards =
        restoInfo?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

      if (Array.isArray(regularCards)) {
        // find the card which contains itemCards
        const menuCard = regularCards.find((c) => c?.card?.card?.itemCards);
        if (menuCard) {
          setRestoMenu(menuCard.card.card.itemCards);
        }
      }
    }
  }, [restoInfo]);

  const info = restoInfo?.cards?.[2]?.card?.card?.info;

  return !restoInfo ? (
    <Shimmer />
  ) : (
    <div>
      <div className="restoNameDiv">
        <h1>{info?.name}</h1>
        <b>
          {info?.cuisines.join(",")} - {info.costForTwoMessage}
        </b>
        <h2>Menu</h2>
      </div>
      <div className="menuItemDiv">
        {restoMenu?.map((singleMenu) => {
          const keyId = singleMenu?.card?.info?.id;
          const { imageId, description, defaultPrice, id, name, price } =
            singleMenu?.card?.info;
          return (
            <div className="singleItemDiv" key={id}>
              <img
                src={FOOD_ITEM_IMG + imageId}
                alt="Pizza Image"
                id="productImg"
              />
              <b> {name} </b>
              <label>{description}</label>
              <label>₹{defaultPrice / 100 || price / 100} </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestoMenu;
