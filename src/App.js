import "./styles.css";
import { useEffect, useState } from "react";
import NetflixCard from "./components/NetflixCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function App() {
  const [myData, setMyData] = useState([]);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "16ed6db628mshc7737a4ef03b705p1355b3jsn21fe2fcfe2b1",
      "X-RapidAPI-Host": "netflix54.p.rapidapi.com"
    }
  };
  const fetchDta = async () => {
    try {
      const res = await fetch(
        "https://netflix54.p.rapidapi.com/search/?query=stranger&offset=0&limit_titles=50&limit_suggestions=20&lang=en",
        options
      );
      // console.log(data);
      const data = await res.json();
      setMyData(data.titles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDta();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <Carousel responsive={responsive} showDots={true}>
      {myData.map((curElem) => {
        return <NetflixCard key={curElem.summary.id} actualData={curElem} />;
      })}
    </Carousel>
  );
}
