import { memo } from "react";
import { FaHeart } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { usePropertyStore } from "../../store/usePropertyStore";
import { formatPrice } from "../../utils/formatters";
import styles from "./PropertyCard.module.css";

export const PropertyCard = memo(({ property }) => {
  const favorites = usePropertyStore((state) => state.favorites);
  const toggleFavorite = usePropertyStore((state) => state.toggleFavorite);
  const favorited = favorites.has(property.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={property.image}
          alt={property.title}
          className={styles.image}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
          }}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{property.title}</h3>
        <div className={styles.location}>
          <HiLocationMarker className={styles.locationIcon} />
          <span>{property.location}</span>
        </div>
        <div className={styles.price}>{formatPrice(property.price)}</div>
        <button
          className={`${styles.favoriteButton} ${favorited ? styles.favorited : ""}`}
          onClick={handleFavoriteClick}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <FaHeart className={styles.heartIcon} />
        </button>
      </div>
    </div>
  );
});

