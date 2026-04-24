import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [onDark, setOnDark] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 350 });
  const ringY = useSpring(y, { damping: 28, stiffness: 350 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const els = document.elementsFromPoint(e.clientX, e.clientY);
      let dark = false;
      for (const node of els) {
        if (node === document.documentElement || node === document.body) continue;
        const bg = window.getComputedStyle(node).backgroundColor;
        const m = bg && bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (m && (m[4] === undefined || parseFloat(m[4]) > 0.5)) {
          dark = 0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3] < 128;
          break;
        }
      }
      setOnDark(dark);
    };
    const over = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, .cursor-hover')) setHovering(true);
    };
    const out = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, .cursor-hover')) setHovering(false);
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, [x, y, visible]);

  if (!visible) return null;

  const dotColor = onDark ? '#FFFFFF' : '#00853E';
  const ringColor = onDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,133,62,0.4)';

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{ x, y, translateX: '-50%', translateY: '-50%', backgroundColor: dotColor }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border-2"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%', borderColor: ringColor }}
        animate={{
          width: hovering ? 56 : 36,
          height: hovering ? 56 : 36,
          opacity: hovering ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.2 }}
        initial={false}
      />
    </>
  );
};

export default CustomCursor;
