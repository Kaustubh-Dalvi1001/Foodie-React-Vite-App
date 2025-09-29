import { useEffect, useState } from "react";
import RestCard from "./RestCard";
import { ALL_RESTOS_API } from "../utils/constants";

const Body = () => {
  const [restData, setRestData] = useState([]);
  const [filteredRestos, setFilteredRestos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [topText, setTopText] = useState("Top Rated Resturants");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(ALL_RESTOS_API);

      const jsonData = await data.json();
      setRestData(jsonData.data.cards.slice(3));
      setFilteredRestos(jsonData.data.cards.slice(3));
    } catch (error) {
      console.error(`Error in fetching data from swiggi's api: ${error}`);
    }
  };

  const handleSearch = () => {
    const searchedRestos = restData.filter((eachResto) => {
      return eachResto.card.card.info.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });
    setFilteredRestos(searchedRestos);
  };

  const topRestos = () => {
    topText === "Top Rated Resturants"
      ? setTopText("All Resturants")
      : setTopText("Top Rated Resturants");

    const Topper = restData.filter((resto) => {
      return resto.card.card.info.avgRating >= 4.5;
    });
    topText === "Top Rated Resturants"
      ? setFilteredRestos(Topper)
      : setFilteredRestos(restData);
  };

  return (
    <div>
      <div id="searchBarDiv">
        <input
          type="search"
          placeholder="Search...."
          id="searchInput"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div id="filterDiv">
        <button onClick={topRestos} id="filter_btn">
          {topText}
        </button>
      </div>

      <div id="resturantContainer">
        <RestCard restData={filteredRestos} />
      </div>
    </div>
  );
};

export default Body;
