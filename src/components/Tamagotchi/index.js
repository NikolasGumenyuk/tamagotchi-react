import React, { useEffect, useState } from "react";
import "./index.css";
import img from "../../assets/img/Death.jfif";
import skeleton from "../../assets/img/skeleton.webp";
import ReincarnationSound from "../../assets/sound/Reincarnation.mpeg";
import DeathSound from "../../assets/sound/Death.mpeg";
import EatSound from "../../assets/sound/Eat.mpeg";

const Tamagotchi = () => {
  const [isLife, setIsLife] = useState(null);
  const [hunger, setHunger] = useState(100);
  const reincarnationAudio = new Audio(ReincarnationSound);
  const deathAudio = new Audio(DeathSound);
  const eatAudio = new Audio(EatSound);

  const handleKill = () => {
    setIsLife(false);
    deathAudio.play();
  };

  useEffect(() => {
    if (!isLife) return;

    let timerId = setInterval(
      () =>
        setHunger((prev) => {
          const newValue = prev - 1;
          if (newValue < 0 || !isLife) {
            handleKill();
            clearTimeout(timerId);
            return 0;
          }
          return newValue;
        }),
      1000
    );
    return () => {
      clearTimeout(timerId);
    };
  }, [isLife]);

  const handleCreate = () => {
    setIsLife(true);
    setHunger(100);
    reincarnationAudio.play();
  };

  const handleSetHunger = () => {
    setHunger((prev) => {
      if (prev < 100) {
        eatAudio.play();
      }
      return Math.min(prev + 5, 100);
    });
  };

  return (
    <>
      <div className="tamagotchi">
        <button onClick={handleCreate} disabled={isLife}>
          Raise Dead
        </button>
        <button onClick={handleKill} disabled={!isLife}>
          Kill
        </button>
      </div>
      <div className="img">
        {!isLife && <img src={img} alt="Death" />}
        {isLife && <img src={skeleton} alt="skeleton" />}
      </div>
      <div className="characteristic">
        {hunger}
        <progress id="hunger" max="100" value={hunger}></progress>
        <button onClick={handleSetHunger} disabled={!isLife}>
          Feed
        </button>
      </div>
    </>
  );
};

export default Tamagotchi;
