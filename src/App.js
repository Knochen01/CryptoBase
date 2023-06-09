import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthContextProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "../src/routes/Home";
import SignIn from "../src/routes/SignIn";
import SignUp from "../src/routes/SignUp";
import Account from "./routes/Account";
import CoinPage from "./components/CoinPage";
import Footer from "./components/Footer";

function App() {
  const [coins, setCoins] = useState([]);
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&locale=en";

  // ------------------------------------------Axios
  useEffect(() => {
    const axiosData = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        setCoins(data);
      } catch (error) {
        alert("Message:" + error.message);
        console.log(error);
      }
    };
    axiosData();
  }, []);

  return (
    <ThemeProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home coins={coins} />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account" element={<Account />} />
            <Route path="/coin/:coinId" element={<CoinPage />}>
              <Route path=":coinId" />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;

// ------------------------------------------Axios with .then .catch
// useEffect(() => {
//   const axiosData = () => {
//     const response = axios
//       .get(url)
//       .then((response) => {
//         setCoins(response.data);
//       })
//       .catch((error) => {
//         alert(error);
//       });
//   };
//   axiosData();
// }, []);

//------------------------------------------ Fetch
// useEffect(() => {
//   const fetchData = () => {
//     const response = fetch(url)
//       .then((response) => response.json())
//       .then((data) => console.log(data))
//       .catch((error) => console.log(error));
//   };
//   fetchData();
// }, [url]);

// ------------------------------------------Fetch with async/await
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setCoins(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   fetchData();
// }, []);
// ------------------------------------------Axios with async await
// useEffect(() => {
//   const axiosData = async () => {
//     try {
//       const response = await axios.get(url);
//       const data = response.data;
//       setCoins(data);
//       console.log(coins);
//     } catch (error) {
//       alert(error);
//     }
//   };
//   axiosData();
// }, [url]);

// ------------------------------------------FETCH SYNTAX
//   useEffect(() => {
//     const fetchData = () => {
//       fetch(url)
//         .then((response) => response.json())
//         .then((data) => console.log(data))
//         .catch((error) => alert(error));
//     };
//     fetchData();
//   }, []);
