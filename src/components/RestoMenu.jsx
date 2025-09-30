import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { FOOD_ITEM_IMG } from "../utils/constants";
import { MENU_API } from "../utils/constants";
import { useParams } from "react-router-dom";

const RestoMenu = () => {
  const [restoInfo, setRestoInfo] = useState(null);
  const [restoMenu, setRestoMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [vegTxt, setVegTxt] = useState("Only-Veg");
  const [searchTxt, setSearchTxt] = useState("");
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
          setFilteredMenu(menuCard.card.card.itemCards);
        }
      }
    }
  }, [restoInfo]);

  const info = restoInfo?.cards?.[2]?.card?.card?.info;

  // Only veg logic
  const handleVeg = () => {
    const vegMenu = restoMenu.filter(
      (singleMenu) => singleMenu.card.info.isVeg
    );
    if (vegTxt === "Only-Veg") {
      setFilteredMenu(vegMenu);
      setVegTxt("All-Menu");
    } else {
      setVegTxt("Only-Veg");
      setFilteredMenu(restoMenu);
    }
  };

  // Search logic
  const handleSearch = () => {
    const searchedMenu = restoMenu.filter((singleMenu) =>
      singleMenu.card.info.name.toLowerCase().includes(searchTxt.toLowerCase())
    );
    setFilteredMenu(searchedMenu);
  };

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
        <div>
          <button onClick={handleVeg} id="vegBtn">{vegTxt}</button>
          <input
            type="search"
            placeholder="Search...."
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
            id="searchInp"
          />
          <button onClick={handleSearch} id="searchBtn">Search</button>
        </div>
      </div>
      <div className="menuItemDiv">
        {filteredMenu?.map((singleMenu) => {
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
