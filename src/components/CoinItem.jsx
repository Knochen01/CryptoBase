import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

function CoinItem({ coin }) {
  const [savedCoin, setSavedCoin] = useState(false);
  const { user } = UserAuth();

  const coinPath = doc(db, "users", `${user?.email}`);

  const saveCoin = async () => {
    if (user?.email) {
      setSavedCoin(true);
      await updateDoc(coinPath, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
        }),
      });
    } else {
      alert("Please sign in to save a coin to your watch list");
    }
  };

  return (
    <tr className="h-[80px]  border-b border-gray-400 overflow-hidden">
      <td onClick={saveCoin}>
        {savedCoin ? <AiFillStar /> : <AiOutlineStar />}
      </td>
      <td>{coin.market_cap_rank}</td>
      <td>
        <Link to={`/coin/${coin.id}`}>
          <div className="flex items-center">
            <img
              src={coin.image}
              alt={coin.id}
              className="w-6 mr-2 rounded-full"
            />
            <p className="hidden sm:table-cell">{coin.name}</p>
          </div>
        </Link>
      </td>
      <td>
        <Link to={`/coin/${coin.id}`}>{coin.symbol.toUpperCase()}</Link>
      </td>
      <td>
        <Link to={`/coin/${coin.id}`}>
          {coin.current_price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Link>
      </td>
      <td>
        <Link to={`/coin/${coin.id}`}>
          {coin.price_change_percentage_24h > 0 ? (
            <p className="text-green-600">
              {coin.price_change_percentage_24h.toFixed(2) + "%"}
            </p>
          ) : (
            <p className="text-red-600">
              {coin.price_change_percentage_24h.toFixed(2) + "%"}
            </p>
          )}
        </Link>
      </td>
      <td className="w-[180px] hidden md:table-cell">
        <Link to={`/coin/${coin.id}`}>
          {coin.total_volume.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Link>
      </td>
      <td className="w-[180px] hidden sm:table-cell">
        <Link to={`/coin/${coin.id}`}>
          {coin.market_cap.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Link>
      </td>
      <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine color="teal" />
        </Sparklines>
      </td>
    </tr>
  );
}

export default CoinItem;
