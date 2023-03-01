import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import './App.css';

function App() {
  return (
    <main>
      <Section id='1' />
      <Section id='2' />
      <Section id='3' />
    </main>
  );
}

export default App;

type SectionProps = {
  id: string;
};

/* use this helper-hook instead of:
const y = useTransform(scrollYProgress, [0, 1], ['-300%', '300%']); */
function useParallax(value: MotionValue<number>, distance: number | string) {
  const range =
    typeof distance === 'number'
      ? [-distance, distance]
      : [`-${distance}`, distance];
  return useTransform<number[], number | string>(value, [0, 1], range);
}

function getImgUrl(id: string) {
  switch (id) {
    case '1':
      return 'https://picsum.photos/1600/1000';
    case '2':
      return 'https://picsum.photos/1600/1001';
    case '3':
    default:
      return 'https://picsum.photos/1600/1007';
  }
}

function Section({ id }: SectionProps) {
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
