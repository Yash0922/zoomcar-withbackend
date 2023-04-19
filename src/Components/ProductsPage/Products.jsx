import { useContext, useEffect, useState } from "react";
import FilterMenu from "./FilterMenu";
import ProductCSS from "./Products.module.css";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { MainContext } from "../Context/MainContextProvider";
import Loading from "./Loading";
import Pagination from "./Pagination";

export default function Products() {
  let {
    sort,
    filter,
    isLoading,
    setIsLoading,
    page,
    setPage,
    totalPage,
    handleTotalPages,
    locationNtime,
  } = useContext(MainContext);
  let [productData, setProductData] = useState([]);
  let [locationAndTime, setLocationAndTime] = useState({
    location: "",
    time: "",
  });

  async function getData(url) {
    setIsLoading(true);
    let fetchData = await fetch(url);
    handleTotalPages(fetchData.headers.get("x-total-count"));
    let data = await fetchData.json();
    setProductData(data);
    setIsLoading(false);
  }

  const getDataLS = () => {
    let locationData = localStorage.getItem("locationLS");
    let timeData = JSON.parse(localStorage.getItem("timeLS"));

    setLocationAndTime({
      locationAndTime,
      location: locationData,
      time: timeData,
    });
  };

  useEffect(() => {
    getDataLS();

    console.log(`https://api-zoom-car-clone.cyclic.app/cards${sort}${filter}`);
    console.log(locationNtime);
    getData(
      `https://api-zoom-car-clone.cyclic.app/cards${sort}${filter}&_page=${page}&_limit=10`
    );
  }, [sort, filter, page]);

  return (
    <section id="productSection" className="bg-light w-100 pt-4">
      {isLoading ? (
        <Loading />
      ) : (
        <div className={`bg-light d-flex ${ProductCSS.mainContainer}`}>
          <div className="filterMenu">
            <FilterMenu />
          </div>

          <div style={{ width: "70%" }}>
            <div className={ProductCSS.productCardsContainer}>
              <div className={`${ProductCSS.nameCity} border rounded`}>
                <div className={ProductCSS.nameCityDOT}></div>
                <p>{locationAndTime.location}</p>
              </div>
              <div className={`${ProductCSS.timeBar} border rounded`}>
                <div>
                  <label> START DATE/TIME</label>
                  <p>{locationAndTime.time.StartDate}</p>
                </div>

                <span>
                  <i className="bi bi-arrow-right"></i>
                </span>

                <div>
                  <label> END DATE/TIME</label>
                  <p>{locationAndTime.time.EndDate}</p>
                </div>
              </div>
              {productData &&
                productData.map((element) => {
                  return <ProductCard key={element.id} productData={element} />;
                })}
            </div>
            <Pagination page={page} />
          </div>
        </div>
      )}
    </section>
  );
}
