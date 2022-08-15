import React, { useEffect, useState } from "react";
import "./index.css";
import img from "../../assets/img/Death.jfif";
import skeleton from "../../assets/img/skeleton.webp";
import ReincarnationSound from "../../assets/sound/Reincarnation.mpeg";
import DeathSound from "../../assets/sound/Death.mpeg";
import EatSound from "../../assets/sound/Eat.mpeg";
import WaterSound from "../../assets/sound/Water.mpeg";
import PeeSound from "../../assets/sound/Pee.mpeg";
import GoldenRainSound from "../../assets/sound/GoldenRain.mpeg";
import ProgressBar from "../Progress-bar";

const Tamagotchi = () => {
  const [soundOn, setSoundOn] = useState(true);
  const [isLife, setIsLife] = useState(null);

  const [hunger, setHunger] = useState(100);
  const [water, setWater] = useState(100);
  const [bladder, setBladder] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [fun, setFun] = useState(100);

  const toggleAudio = () => {
    setSoundOn((prev) => !prev);
  };

  const playAudio = (sound) => {
    if (!soundOn) return;
    const audio = new Audio(sound);
    audio.play();
  };

  useEffect(() => {
    if (!isLife) return;

    let decreaseTimerId = setInterval(() => {
      const decreaseCharacteristic = (prev) => {
        const newValue = prev - 3;
        if (newValue < 0 || !isLife) {
          handleKill();
          clearTimeout(decreaseTimerId);
          return 0;
        }
        return newValue;
      };
      setHunger(decreaseCharacteristic);
      setWater(decreaseCharacteristic);
      setFun(decreaseCharacteristic);
      setEnergy(decreaseCharacteristic);
    }, 1000);

    let increaseTimerId = setInterval(() => {
      const increaseCharacteristic = (prev) => {
        const newValue = prev + 1;
        if (newValue > 100 || !isLife) {
          playAudio(GoldenRainSound);
          setBladder(0);
          alert("Golden Rain!!!");
          return 100;
        }
        return newValue;
      };
      setBladder(increaseCharacteristic);
    }, 1000);

    return () => {
      clearTimeout(decreaseTimerId);
      clearTimeout(increaseTimerId);
    };
  }, [isLife]);

  const handleCreate = () => {
    setIsLife(true);
    setHunger(100);
    setWater(100);
    setBladder(0);
    setFun(100);
    playAudio(ReincarnationSound);
  };

  const handleKill = () => {
    setIsLife(false);
    playAudio(DeathSound);
  };

  const randomNumber = () => {
    return Math.ceil(Math.random() * 6);
  };

  const handleSetHunger = () => {
    setHunger((prev) => {
      if (prev < 100) {
        playAudio(EatSound);
      }
      return Math.min(prev + randomNumber(), 100);
    });

  };

  const handleSetWater = () => {
    setWater((prev) => {
      if (prev < 100) {
        playAudio(WaterSound);
      }
      return Math.min(prev + randomNumber(), 100);
    });
    setBladder((prev) => prev + 30);
  };

  const handleSetBladder = () => {
    setBladder(0);
    playAudio(PeeSound);
  };

  const handleSetFun = () => {
    setFun(100);
    setEnergy((prev) => prev - 20)
  };

  return (
    <>
      <div className="tamagotchi">
        <div className="main-button">
          <button onClick={handleCreate} disabled={isLife}>
            Raise Dead
          </button>
          <button onClick={handleKill} disabled={!isLife}>
            Kill
          </button>
          <button onClick={toggleAudio}>
            <i
              className={
                soundOn ? "fa-solid fa-volume-high" : "fa-solid fa-volume-xmark"
              }
            ></i>
          </button>
        </div>
        <div className="img">
          {!isLife && <img src={img} alt="Death" height="250" />}
          {isLife && <img src={skeleton} alt="skeleton" />}
        </div>
        <div className="characteristic-button">
          <button onClick={handleSetHunger} disabled={!isLife}>
            Feed
          </button>
          <button onClick={handleSetWater} disabled={!isLife}>
            Water
          </button>
          <button onClick={handleSetBladder} disabled={!isLife}>
            Pee
          </button>
          <button onClick={handleSetFun} disabled={!isLife}>
            Причмирить Льоху
          </button>
        </div>
      </div>
      <ProgressBar
        completed={hunger}
        label="Hunger"
        icon={<i className="fa-solid fa-utensils"></i>}
      />
      <ProgressBar
        completed={water}
        label="Water"
        icon={<i className="fa-solid fa-droplet"></i>}
      />
      <ProgressBar
        completed={bladder}
        label="Bladder"
        icon={<i className="fa-solid fa-toilet"></i>}
      />
      <ProgressBar
        completed={fun}
        label="Fun"
        icon={<i className="fa-solid fa-face-grin"></i>}
      />
      <ProgressBar
        completed={energy}
        label="Energy"
        icon={
          <i
            className={
              energy > 70
                ? "fa-solid fa-battery-full"
                : "fa-solid fa-battery-half"
            }
          ></i>
        }
      />
    </>
  );
};

export default Tamagotchi;
