"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import HeroDetails from "../HeroDetails";
import HeroPicture from "../HeroPicture";

import styles from "./carousel.module.scss";

import { IHeroData } from "@/interfaces/heroes";

interface IProps {
  heroes: IHeroData[];
  activeId: string;
}

enum enPosition {
  front = 0,
  middle = 1,
  back = 2,
}

export default function Carousel({ heroes, activeId }: IProps) {
  // Controla os itens visíveis do carrossel
  const [visibleItems, setVisibleItems] = useState<IHeroData[] | null>(null);

  // Armazena o item ativo do carrossel
  const [activeIndex, setActiveIndex] = useState(
    heroes.findIndex((hero) => hero.id === activeId)
  );

  // Altera o visibleItems sempre que o activeIndex é alterado
  useEffect(() => {
    // itens que serão mostrados ao longo do carrossel
    const items = [...heroes];

    // calcula o índice do array de acordo com o item ativo
    // de forma que o número nunca saia do escopo do array
    const indexInArrayScope =
      ((activeIndex % items.length) + items.length) % items.length;

    // itens que estão visíveis neste momento para o usuário
    // duplicamos o array para dar a impressão de um carrossel infinito (360deg)
    const visibleItems = [...items, ...items].slice(
      indexInArrayScope,
      indexInArrayScope + 3
    );

    setVisibleItems(visibleItems);
  }, [heroes, activeIndex]);

  // Altera herói ativo no carrossel
  // +1 rotaciona no sentido horário
  // -1 rotaciona no sentido anti-horário
  const handleChangeActiveIndex = (newDirection: number) => {
    setActiveIndex((prevActiveIndex: number) => prevActiveIndex + newDirection);
  };

  if (!visibleItems) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div
          className={styles.wrapper}
          onClick={() => handleChangeActiveIndex(1)}
        >
          <AnimatePresence mode="popLayout">
            {visibleItems?.map((item: IHeroData, position) => (
              <motion.div
                key={item.id}
                className={styles.hero}
                transition={{ duration: 0.8 }}
                animate={{ ...getItemStyles(position) }}
              >
                <HeroPicture hero={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className={styles.details}>
        <HeroDetails data={heroes[0]} />
      </div>
    </div>
  );
}

const getItemStyles = (position: enPosition) => {
  if (position === enPosition.front) {
    return {
      filter: "blur(10px)",
      scale: 1.2,
      zIndex: 3,
    };
  }
  if (position === enPosition.middle) {
    return {
      left: 300,
      scale: 0.8,
      zIndex: 2,
      top: "-10%",
    };
  }

  return {
    filter: "blur(10px)",
    zIndex: 1,
    scale: 0.6,
    left: 160,
    top: "-20%",
    opacity: 0.8,
  };
};
