import {useEffect, useState, useMemo, useCallback} from "react";
import {usePropertyStore} from "../store/usePropertyStore";
import {useFilterStore} from "../store/useFilterStore";
import {useFilteredProperties} from "../hooks/useFilteredProperties";
import {useURLSync} from "../hooks/useURLSync";
import {loadProperties} from "../utils/loadProperties";
import {calculatePriceRange} from "../utils/calculatePriceRange";
import {FilterSection} from "../components/FilterSection/FilterSection";
import {TypeFilter} from "../components/FilterSection/TypeFilter";
import {PriceRangeFilter} from "../components/FilterSection/PriceRangeFilter";
import {SizeFilter} from "../components/FilterSection/SizeFilter";
import {FeaturesFilter} from "../components/FilterSection/FeaturesFilter";
import {MobileFilterDrawer} from "../components/MobileFilterDrawer/MobileFilterDrawer";
import {MobileFilterButton} from "../components/MobileFilterButton/MobileFilterButton";
import {PropertyGrid} from "../components/PropertyGrid/PropertyGrid";
import {EmptyState} from "../components/EmptyState/EmptyState";
import {filterConfig} from "../data/filterConfig";
import styles from "./PropertySearchView.module.css";

export const PropertySearchView = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const loadPropertiesData = usePropertyStore((state) => state.loadProperties);
  const filteredProperties = useFilteredProperties();
  const allProperties = usePropertyStore((state) => state.properties);
  const setPriceRangeConfig = useFilterStore(
    (state) => state.setPriceRangeConfig
  );

  // Sync filters with URL
  useURLSync();

  // Use selectors to minimize re-renders
  const selectedTypes = useFilterStore((state) => state.selectedTypes);
  const selectedFeatures = useFilterStore((state) => state.selectedFeatures);
  const priceRange = useFilterStore((state) => state.priceRange);
  const sizeRange = useFilterStore((state) => state.sizeRange);
  const isLoading = useFilterStore((state) => state.isLoading);

  const priceRangeConfig = useFilterStore((state) => state.priceRangeConfig);

  // Memoize active filter count calculation
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (!selectedTypes.has("all") && selectedTypes.size > 0) count++;
    if (selectedFeatures.size > 0) count++;
    if (
      priceRange[0] !== priceRangeConfig.min ||
      priceRange[1] !== priceRangeConfig.max
    )
      count++;
    if (
      sizeRange[0] !== filterConfig.sizeRange.min ||
      sizeRange[1] !== filterConfig.sizeRange.max
    )
      count++;
    return count;
  }, [
    selectedTypes,
    selectedFeatures,
    priceRange,
    priceRangeConfig,
    sizeRange,
  ]);

  // Memoize callbacks to prevent unnecessary re-renders
  const handleOpenDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  // Memoize skeleton count
  const skeletonCount = useMemo(() => {
    return filteredProperties.length || 6;
  }, [filteredProperties.length]);

  // Get location from properties data (use first property's location or fallback)
  const location = useMemo(() => {
    if (allProperties.length > 0) {
      return allProperties[0].location;
    }
    // Fallback if no properties loaded yet
    if (filteredProperties.length > 0) {
      return filteredProperties[0].location;
    }
    return "San Francisco"; // Default fallback
  }, [allProperties, filteredProperties]);

  useEffect(() => {
    const properties = loadProperties();
    loadPropertiesData(properties);

    // Calculate and set price range from dataset
    const priceRange = calculatePriceRange(properties);
    setPriceRangeConfig(priceRange.min, priceRange.max);
  }, [loadPropertiesData, setPriceRangeConfig]);

  return (
    <>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <FilterSection>
            <TypeFilter />
            <PriceRangeFilter />
            <SizeFilter />
            <FeaturesFilter />
          </FilterSection>
        </aside>
        <main className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.resultsCount}>
              {filteredProperties.length} Results{" "}
              <span className={styles.locationText}>in {location}</span>
            </h1>
            <MobileFilterButton
              onClick={handleOpenDrawer}
              filterCount={activeFilterCount}
              isOpen={isDrawerOpen}
            />
          </div>
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {filteredProperties.length} properties found
          </div>
          {filteredProperties.length === 0 && !isLoading ? (
            <EmptyState />
          ) : (
            <PropertyGrid
              properties={filteredProperties}
              isLoading={isLoading}
              skeletonCount={skeletonCount}
            />
          )}
        </main>
      </div>
      <MobileFilterDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
    </>
  );
};
