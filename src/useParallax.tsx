import { MotionValue, useTransform } from 'framer-motion';

/* use this helper-hook instead of:
const y = useTransform(scrollYProgress, [0, 1], ['-300%', '300%']); */
export function useParallax(
  value: MotionValue<number>,
  distance: number | string
) {
  const range =
    typeof distance === 'number'
      ? [-distance, distance]
      : [`-${distance}`, distance];
  return useTransform<number[], number | string>(value, [0, 1], range);
}
