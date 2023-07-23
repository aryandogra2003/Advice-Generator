import pattern from "../images/pattern-divider-desktop.svg";

import dice from "../images/icon-dice.svg";
import classes from "./Card.module.css";
import { useCallback, useState, useEffect } from "react";
const Card = (props) => {
  const [advice, setAdvice] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchAdviceHandler = useCallback(async () => {
    setIsLoading(true);
    // advice.length = 0;
    try {
      console.log("dice clicked");
      const response = await fetch("https://api.adviceslip.com/advice");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const adv = [];
      for (const key in data) {
        adv.push({ id: data[key].id.toString(), title: data[key].advice });
      }
      setAdvice(adv);
    } catch (error) {
      console.log(error.message);
    }

    // console.log(advice);
    // console.log(advice[0]);
    // console.log(advice[1]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchAdviceHandler();
  }, [fetchAdviceHandler]);

  return (
    <>
      <div className={classes.card}>
        <div className={classes.diceBox} onClick={fetchAdviceHandler}>
          <img src={dice} alt="dice" />
        </div>
        {advice.map((ad) => (
          <>
            <h2 className={classes.advice}>
              {isLoading ? "Loading..." : `Advice # ${ad.id}`}
            </h2>

            <h1 className={classes.text}>
              {isLoading ? "Loading..." : ad.title}
            </h1>
          </>
        ))}

        <img
          src={pattern}
          alt="pattern divider desktop"
          className={classes.img}
        />
      </div>
    </>
  );
};
export default Card;
