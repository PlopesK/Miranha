import Image from "next/image";
import { Quicksand } from "next/font/google";

import styles from "./heroDetails.module.scss";

import { spidermanFont } from "@/fonts";
import { IHeroData } from "@/interfaces/heroes";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

interface IProps {
  hero: IHeroData;
}

export default function HeroDetails({ hero }: IProps) {
  const { id, name, universe, details } = hero || {};
  if (!hero) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={quicksand.className}>
        <h1 className={`${spidermanFont.className} ${styles.title}`}>
          {name} (Universe-{universe})
        </h1>
        <div className={styles.details}>
          <h2 className={styles.subtitle}>Details</h2>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td className={styles.label}>Full Name</td>
                <td>{details.fullName}</td>
              </tr>
              <tr>
                <td className={styles.label}>Birthday</td>
                <td>
                  {new Date(details.birthday).toLocaleDateString("pt-BR")}
                </td>
              </tr>
              <tr>
                <td className={styles.label}>Homeland</td>
                <td>{details.homeland}</td>
              </tr>
              <tr>
                <td className={styles.label}>Height</td>
                <td>{details.height.toFixed(2)}m</td>
              </tr>
              <tr>
                <td className={styles.label}>Weight</td>
                <td>{details.weight.toFixed(2)}kg</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.details}>
          <h2 className={styles.subtitle}>First Appearance</h2>
          <Image
            src={`/spiders/${id}-comic-book.png`}
            alt={`First Appearance in the comics of ${name} in the universe ${universe}`}
            width={80}
            height={122}
          />
        </div>
      </div>
    </>
  );
}
