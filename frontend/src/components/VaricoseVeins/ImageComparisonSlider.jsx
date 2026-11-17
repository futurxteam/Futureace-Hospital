import React, { useState, useId } from 'react';

/**
 * Reusable before/after comparison slider.
 *
 * Takes TWO separate, approved images — never a combined poster.
 * Accessible: a native range input drives the divider (keyboard arrows,
 * Home/End, screen-reader value announcements).
 *
 * Props: beforeSrc, afterSrc, beforeAlt, afterAlt, width, height (intrinsic
 * size, prevents layout shift), caption (optional clinical description).
 */
export default function ImageComparisonSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before treatment',
  afterAlt = 'After treatment',
  width = 1200,
  height = 1500,
  caption,
}) {
  const id = useId();
  const [position, setPosition] = useState(50);

  return (
    <figure className="vv-compare">
      <div
        className="vv-compare__stage"
        style={{ '--vv-pos': `${position}%`, aspectRatio: `${width} / ${height}` }}
      >
        <img
          src={afterSrc}
          alt={afterAlt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="vv-compare__img"
        />
        <img
          src={beforeSrc}
          alt={beforeAlt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="vv-compare__img vv-compare__img--before"
        />

        <span className="vv-compare__tag vv-compare__tag--before" aria-hidden="true">Before</span>
        <span className="vv-compare__tag vv-compare__tag--after" aria-hidden="true">After</span>
        <span className="vv-compare__divider" aria-hidden="true">
          <span className="vv-compare__handle" />
        </span>

        <input
          id={id}
          type="range"
          min="0"
          max="100"
          step="1"
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="vv-compare__range"
          aria-label="Drag to compare before and after images"
          aria-valuetext={`${position}% before image shown`}
        />
      </div>
      {caption && <figcaption className="vv-compare__caption">{caption}</figcaption>}
    </figure>
  );
}

