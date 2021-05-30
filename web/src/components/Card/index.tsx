import React from 'react';
import Image from 'next/image'
import styles from './styles.module.scss'

interface CardProps {
  title: string;
  link: string
  image: string
}

const Card: React.FC<CardProps> = ({ title, children, link, image }) => {
  return (
    <div className={styles.card}>
      <Image objectFit="cover" width={500} height={350} src={`/${image}`} alt="Test" />

      <div className={styles.cardInfo}>
        <h2>{title}</h2>

        <p>{children}</p>
      </div>

      <a target="_blank" href={link}> Ver mais </a>
    </div>
  );
}

export default Card;
