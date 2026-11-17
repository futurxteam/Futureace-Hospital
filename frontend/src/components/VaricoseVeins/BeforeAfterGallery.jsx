import React from 'react';
import { Info } from 'lucide-react';
import varicoseVeinsConfig from '../../config/varicoseVeinsConfig';
import ImageComparisonSlider from './ImageComparisonSlider';

/**
 * Before & After gallery.
 *
 * - The supplied poster is a combined graphic, so it is displayed as an
 *   (illustrative) image — NOT as a slider.
 * - Genuine patient pairs added to `approvedGalleryPairs` in the config are
 *   rendered with the reusable ImageComparisonSlider automatically.
 * - `midCta` renders between the poster and the approved examples.
 */
export default function BeforeAfterGallery({ midCta }) {
  const { images, approvedGalleryPairs, galleryDisclaimer } = varicoseVeinsConfig;
  const poster = images.beforeAfterPoster;

  return (
    <section className="vv-section vv-section--tint" aria-labelledby="vv-gallery-title">
      <div className="vv-container">
        <div className="vv-section__head">
          <span className="vv-eyebrow">Treatment outcomes</span>
          <h2 id="vv-gallery-title" className="vv-h2">Before &amp; After Treatment</h2>
        </div>

        <figure className="vv-poster">
          <img
            src={poster.src}
            alt={poster.alt}
            width={poster.width}
            height={poster.height}
            loading="lazy"
            decoding="async"
            className="vv-poster__img"
          />
          <figcaption className="vv-poster__caption">Illustrative image</figcaption>
        </figure>

        {midCta}

        {approvedGalleryPairs.length > 0 && (
          <div className="vv-compare-grid">
            {approvedGalleryPairs.map((pair) => (
              <ImageComparisonSlider
                key={pair.id}
                beforeSrc={pair.before}
                afterSrc={pair.after}
                beforeAlt={pair.beforeAlt}
                afterAlt={pair.afterAlt}
                caption={pair.treatment}
              />
            ))}
          </div>
        )}

        <p className="vv-disclaimer" role="note">
          <Info size={18} aria-hidden="true" />
          <span>{galleryDisclaimer}</span>
        </p>
      </div>
    </section>
  );
}

