const Marquee = ({ items, speed = 40, reverse = false, className = '' }) => {
  return (
    <div className={`overflow-hidden ${className}`} style={{ mask: 'linear-gradient(90deg, transparent, white 8%, white 92%, transparent)' }}>
      <div
        className="flex whitespace-nowrap animate-marquee"
        style={{
          '--marquee-speed': `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-3" aria-hidden={copy === 1}>
            {items.map((item, i) => (
              <span
                key={i}
                className="px-5 py-2.5 bg-unt-green text-white text-sm font-semibold rounded-full whitespace-nowrap"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
