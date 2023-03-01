import { MotionValue, useTransform } from 'framer-motion';

/* use this helper-hook instead of:
const y = useTransform(scrollYProgress, [0, 1], ['-300%', '300%']); */
export function useParallax(
  value: MotionValue<number>,
  distance: number | string,
  distance2?: number | string
) {
  const range =
    typeof distance === 'number'
      ? [
          ((typeof distance2 === 'number' && distance2) || distance) * -1,
          distance,
        ]
      : !distance.startsWith('-')
      ? [
          `-${(typeof distance2 === 'string' && distance2) || distance}`,
          distance,
        ]
      : // flip sign: -/+ -> +/- to reverse movement-direction
        [
          ((typeof distance2 === 'string' && distance2) || distance).slice(1),
          distance,
        ];
  return useTransform<number[], number | string>(value, [0, 1], range);
}
