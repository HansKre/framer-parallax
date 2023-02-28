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

function useParallax(value: MotionValue<number>, distance: number | string) {
  const range =
    typeof distance === 'number'
      ? [-distance, distance]
      : [`-${distance}`, distance];
  return useTransform<number[], number | string>(value, [0, 1], range);
}

function Section({ id }: SectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end start', 'start end'],
  });
  // const y = useTransform(scrollYProgress, [0, 1], ['-300%', '300%']);
  const y = useParallax(scrollYProgress, '300%');

  useMotionValueEvent(scrollYProgress, 'change', (v) => console.log(id, v));

  return (
    <section>
      <div ref={ref} />
      <motion.h1 style={{ y }}>{`This is section ${id}`}</motion.h1>
    </section>
  );
}
