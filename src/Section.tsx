import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { getImgUrl } from './getImgUrl';
import { useParallax } from './useParallax';
import './Section.css';

type Props = {
  id: string;
};

export function Section({ id }: Props) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end start', 'start end'],
  });
  const yH1 = useParallax(scrollYProgress, '0%', '-100%');
  const yImg = useParallax(scrollYProgress, '-50%');

  // useMotionValueEvent(yH1, 'change', (v) => console.log(id, v));

  return (
    <section>
      {/* this is the scroll-reference for the scroll-progress. For the scroll-progress-offset to work, the target and container cannot be in a parent-child relationship */}
      <div ref={ref} />
      <motion.img style={{ y: yImg }} src={getImgUrl(id)} alt={id} />
      <motion.h1 style={{ y: yH1 }}>{`This is section ${id}`}</motion.h1>
    </section>
  );
}
