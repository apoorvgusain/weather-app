import { useEffect } from "react";
import { useState } from "react";
import CityTable from "./components/CityTable";
import SearchInput from "./components/SearchInput";
const App = () => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [start, setStart] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetchCities();
  }, [start]);

  const fetchCities = async () => {
    try {
      const response = await fetch(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?order_by=name%20ASC&limit=40&offset=${start}`
      );

      const data = await response.json();
      setCities((prevData) => [...prevData, ...data.results]);

      setFilteredCities((prevData) => [...prevData, ...data.results]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoadingStatus(false);
      setStart((prev) => prev + 40);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    setLoadingStatus(false);
    if (e.target.value === "") {
      console.log("Search Term" + searchTerm);
      setFilteredCities(cities);
    } else {
      try {
        const response = await fetch(
          `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=search(name%2C%20%22${searchTerm}%22)&limit=100`
        );
        const data = await response.json();
        console.log(data);
        setFilteredCities(data.results);
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log(cities);
  console.log(filteredCities);
  return (
    <>
      <SearchInput handleSearch={handleSearch} searchTerm={searchTerm} />
      <CityTable cities={filteredCities} />

      {loadingStatus && <p>Loading</p>}
    </>
  );
};
export default App;
