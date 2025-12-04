import {memo, useCallback} from "react";
import {FaHeart} from "react-icons/fa";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {usePropertyStore} from "../../store/usePropertyStore";
import {formatPrice} from "../../utils/formatters";
import styles from "./PropertyCard.module.css";

export const PropertyCard = memo(
  ({property}) => {
    // Use selector to only subscribe to this specific property's favorite state
    // This prevents re-rendering all cards when any favorite changes
    const favorited = usePropertyStore((state) =>
      state.favorites.has(property.id)
    );
    const toggleFavorite = usePropertyStore((state) => state.toggleFavorite);

    const handleFavoriteClick = useCallback(
      (e) => {
        e.stopPropagation();
        toggleFavorite(property.id);
      },
      [toggleFavorite, property.id]
    );

    return (
      <article
        className={styles.card}
        role="article"
        aria-labelledby={`property-title-${property.id}`}
      >
        <div className={styles.imageContainer}>
          <img
            src={property.image}
            alt={`${property.title} - ${property.location}`}
            className={styles.image}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        </div>
        <div className={styles.content}>
          <h3 id={`property-title-${property.id}`} className={styles.title}>
            {property.title}
          </h3>
          <div
            className={styles.location}
            aria-label={`Location: ${property.location}`}
          >
            <HiOutlineLocationMarker
              className={styles.locationIcon}
              aria-hidden="true"
            />
            <span>{property.location}</span>
          </div>
          {/* <div
            className={styles.price}
            aria-label={`Price: ${formatPrice(property.price)}`}
          >
            {formatPrice(property.price)}
          </div> */}
          <button
            className={`${styles.favoriteButton} ${
              favorited ? styles.favorited : ""
            }`}
            onClick={handleFavoriteClick}
            aria-label={
              favorited ? "Remove from favorites" : "Add to favorites"
            }
            aria-pressed={favorited}
          >
            <FaHeart className={styles.heartIcon} aria-hidden="true" />
          </button>
        </div>
      </article>
    );
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    // Return false if props are different (re-render)
    return (
      prevProps.property.id === nextProps.property.id &&
      prevProps.property.title === nextProps.property.title &&
      prevProps.property.location === nextProps.property.location &&
      prevProps.property.price === nextProps.property.price &&
      prevProps.property.image === nextProps.property.image
    );
  }
);
