import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from  './styles.module.scss'
import { motion } from 'framer-motion'

import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

interface ImageProps {
  id: string,
  path: string,
  name: string,
  description: string,
  created_at: Date,
  updated_at: Date
}

interface CarouselProps {
  image1: ImageProps
  image2: ImageProps
  image3: ImageProps
  isDefault?: boolean
}

const Carousel: React.FC<CarouselProps> = ({ image1, image2, image3, isDefault = false}, props: any) => {
  const [counter, setCounter] = useState(0)
  const [childrenLength, setChildrenLength] = useState<number>(0)

  const {initialMinute = 0, initialSeconds = 5} = props;
  const [ minutes, setMinutes ] = useState(initialMinute);
  const [seconds, setSeconds ] =  useState(initialSeconds);

  const slide = useRef<HTMLDivElement | any>(null)
  const btnNext = useRef<HTMLButtonElement>(null)
  const btnPrev = useRef<HTMLButtonElement>(null)

  const size = slide.current?.firstChild.clientWidth

  React.useLayoutEffect = React.useEffect

  useLayoutEffect(() => {
    slide.current.style.transform = 'translateX(' + (-size * counter) + "px)"
  })

  useEffect(()=>{
    setChildrenLength(slide.current.children.length)

    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)

        return ()=> {
            clearInterval(myInterval);
          };
  });

  useEffect(() => {
    if (seconds === 0 && counter === (childrenLength - 1)) {
      slide.current.style.transition = "transform 0.4s ease-in-out"
      setCounter(0)
      setSeconds(5)
      slide.current.style.transform = 'translateX(' + (-size * counter) + "px)"
    } else if (seconds === 0) {
      slide.current.style.transition = "transform 0.4s ease-in-out"
      setCounter(oldValue => oldValue + 1)
      setSeconds(5)
      slide.current.style.transform = 'translateX(' + (-size * counter) + "px)"
    }


  })


  function handleNext() {
    slide.current.style.transition = "transform 0.4s ease-in-out"
    if (counter === (childrenLength - 1)) {
      setSeconds(5)
      return setCounter(0)
    }

    setCounter(oldValue => oldValue + 1)
    setSeconds(5)
    slide.current.style.transform = 'translateX(' + (-size * counter) + "px)"
  }

  function handlePrev() {
    slide.current.style.transition = "transform 0.4s ease-in-out"
    if (counter === 0) {
      setSeconds(5)
      return setCounter(childrenLength - 1)
    }

    setCounter(oldValue => oldValue - 1)
    setSeconds(5)
    slide.current.style.transform = 'translateX(' + (-size * counter) + "px)"
  }

  return (
        <section className={styles.carouselContainer}>

          <div ref={slide} className={styles.carouselSlide}>
            <div className={styles.imageContainer}>
              <img src={!isDefault ? `${process.env.URL}/uploads/${image1.path}` : image1.path} alt={image1.name} />

              <div className="imageInfo">
                <h1>{image1.name}</h1>
                <p>{image1.description}</p>
              </div>
            </div>

            <div className={styles.imageContainer}>
              <img src={!isDefault ? `${process.env.URL}/uploads/${image2.path}` : image2.path} alt={image2.name} />

              <div className="imageInfo">
                <h1>{image2.name}</h1>
                <p>{image2.description}</p>
              </div>
            </div>

            <div className={styles.imageContainer}>
              <img src={!isDefault ? `${process.env.URL}/uploads/${image3.path}` : image3.path} alt={image3.name} />

              <div className="imageInfo">
                <h1>{image3.name}</h1>
                <p>{image3.description}</p>
              </div>
            </div>
          </div>

          <motion.button
            className={styles.prevBtn}
            ref={btnPrev}
            onClick={handlePrev}
            whileTap={{ opacity: 0.2 }}
          >
            <FaArrowLeft />
          </motion.button>

          <motion.button
            className={styles.nextBtn}
            ref={btnNext}
            onClick={handleNext}
            whileTap={{ opacity: 0.2 }}
          >
            <FaArrowRight />
          </motion.button>
        </section>
  );
}

export default Carousel;
