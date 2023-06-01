import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { FaTwitter, FaFacebook, FaReddit, FaGithub } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import DOMPurify from "dompurify";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

function CoinPage() {
  const [coin, setCoin] = useState({});
  const [savedCoin, setSavedCoin] = useState(false);
  const { user } = UserAuth();
  const params = useParams();
  const coinPath = doc(db, "users", `${user?.email}`);
  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`;

  // --------------------Fetch Syntax
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(url);
  //         const data = await response.json();
  //         setCoin(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchData();
  //   }, []);
  // -------------------- Axios Syntax with .then .catch
  useEffect(() => {
    const axiosData = () => {
      axios
        .get(url)
        .then((response) => setCoin(response.data))
        .catch((error) => console.log(error));
    };
    axiosData();
  }, [url]);

  useEffect(() => {
    console.log(coin);
  }, [coin]);

  const saveCoin = async () => {
    if (user?.email) {
      setSavedCoin(true);
      await updateDoc(coinPath, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image.small,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
        }),
      });
    } else {
      alert("Please sign in to save a coin to your watch list");
    }
  };

  return (
    <div className="rounded-div my-12 py8">
      <div className="flex py-8 ">
        <img className="w-20 mr-8" src={coin.image?.large} alt="/" />
        <div onClick={saveCoin}>
          <p className="text-3xl font-bold inline">{coin?.name}</p>
          {savedCoin ? (
            <AiFillStar size={25} className="inline ml-4" />
          ) : (
            <AiOutlineStar size={25} className="inline ml-4" />
          )}

          <p>({coin.symbol?.toUpperCase()} / USD)</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between">
            {coin.market_data?.current_price.usd ? (
              <p className="text-3xl font-bold">
                ${coin.market_data.current_price.usd.toLocaleString()}
              </p>
            ) : null}
            <p>7 Day</p>
          </div>
          <div>
            <Sparklines data={coin.market_data?.sparkline_7d.price}>
              <SparklinesLine color="teal" />
            </Sparklines>
          </div>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Market Cap</p>
              {coin.market_data?.market_cap.usd ? (
                <p>
                  {coin.market_data.market_cap.usd.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Volume (24h)</p>
              {coin.market_data?.total_volume.usd ? (
                <p>
                  {coin.market_data.total_volume.usd.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">24h High</p>
              {coin.market_data?.high_24h.usd ? (
                <p>
                  {coin.market_data.high_24h.usd.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">24h Low</p>
              {coin.market_data?.low_24h.usd ? (
                <p>
                  {coin.market_data.low_24h.usd.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        {/* ----------Market Stats---------- */}
        <div>
          <p className="text-xl font-bold">Market Stats</p>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Market Rank</p>
              {coin.market_cap_rank}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Hashing Algorithm</p>
              {coin.hashing_algorithm ? <p>{coin.hashing_algorithm}</p> : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Trust Score</p>
              {coin.tickers ? <p>{coin.liquidity_score.toFixed(2)}</p> : null}
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Price Change (24h)</p>
              {coin.market_data ? (
                <p>
                  {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (7d)</p>
              {coin.market_data ? (
                <p>{coin.market_data.price_change_percentage_7d.toFixed(2)}%</p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (14d)</p>
              {coin.market_data ? (
                <p>
                  {coin.market_data.price_change_percentage_14d.toFixed(2)}%
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Price Change (30d)</p>
              {coin.market_data ? (
                <p>
                  {coin.market_data.price_change_percentage_30d.toFixed(2)}%
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (60d)</p>
              {coin.market_data ? (
                <p>
                  {coin.market_data.price_change_percentage_60d.toFixed(2)}%
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (1y)</p>
              {coin.market_data ? (
                <p>{coin.market_data.price_change_percentage_1y.toFixed(2)}%</p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-around p-8 text-accent">
            <FaTwitter />
            <FaFacebook />
            <FaGithub />
            <FaReddit />
          </div>
        </div>
      </div>
      {/* ----------Description---------- */}
      <div className="py-4">
        <p className="text-xl font-bold">About {coin.name}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              coin.description ? coin.description.en : ""
            ),
          }}
        ></p>
      </div>
    </div>
  );
}

export default CoinPage;
