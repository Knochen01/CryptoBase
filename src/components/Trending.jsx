import React, { useState, useEffect } from "react";
import axios from "axios";
import bitcoinImage from "../assets/bitcoin.webp";
import { Link } from "react-router-dom";

function Trending() {
  const [trendingCoin, setTrendingCoin] = useState([]);
  const url = "https://api.coingecko.com/api/v3/search/trending";

  //--------------------Using Axios with .then .catch
  useEffect(() => {
    const axiosData = () => {
      axios
        .get(url)
        .then((response) => {
          const data = response.data.coins;
          setTrendingCoin(data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    axiosData();
  }, [url]);
  useEffect(() => {
    // console.log(trendingCoin);
  }, [trendingCoin]);

  return (
    <div className="rounded-div my-12 py-8 text-primary">
      <h1 className="text-2xl font-bold py-4">Trending Coins</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendingCoin.map((coin) => (
          <Link to={`/coin/${coin?.item.id}`}>
            <div
              key={coin.item.coin_id}
              className="rounded-div flex justify-between p-4 hover:scale-105 ease-in duration-300"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex">
                  <img
                    className="mr-4 rounded-full"
                    src={coin.item.small}
                    alt="/"
                  />
                  <div>
                    <p className="font-bold">{coin.item.name}</p>
                    <p>{coin.item.symbol}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <img src={bitcoinImage} alt="/" className="w-4 mr-2" />
                  <p>{coin.item.price_btc.toFixed(7)}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Trending;

// //--------------------Axios with async await
//   useEffect(() => {
//     const axiosData = async () => {
//       try {
//         const response = await axios.get(url);
//         const data = response.data.coins;
//         console.log(data);
// setTrendingCoin(data);
//       } catch (error) {
//         console.log("There was an error", error);
//       }
//     };
//     axiosData();
//   }, []);

// //--------------------Fetch with async await
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log(data.coins);
//         setTrendingCoin(data);
//       } catch (error) {
//         console.log("There was an error", error);
//       }
//     };
//     fetchData();
//   }, []);
// //--------------------Fetch with .then .catch
//   useLayoutEffect(() => {
//     const fetchData = () => {
//       const response = fetch(url)
//         .then((response) => response.json())
//         .then((data) => console.log(data))
//         .then((data) => setTrendingCoin(data.coins))
//         .catch((error) => {
//           console.log("There was an error", error);
//         });
//     };
//     fetchData();
//   }, []);
