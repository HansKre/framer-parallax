import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { getImgUrl } from './getImgUrl';
import { useParallax } from './useParallax';

type Props = {
  id: string;
};

export function Section({ id }: Props) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end start', 'start end'],
  });
  const y = useParallax(scrollYProgress, '300%');

  useMotionValueEvent(scrollYProgress, 'change', (v) => console.log(id, v));

  return (
    <section>
      {/* this is the scroll-reference for the scroll-progress. For the scroll-progress-offset to work, the target and container cannot be in a parent-child relationship */}
      <div ref={ref} />
      <img src={getImgUrl(id)} alt={id} />
      <motion.h1 style={{ y }}>{`This is section ${id}`}</motion.h1>
    </section>
  );
}
