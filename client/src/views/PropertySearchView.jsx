import {useEffect, useState} from "react";
import {usePropertyStore} from "../store/usePropertyStore";
import {useFilterStore} from "../store/useFilterStore";
import {useFilteredProperties} from "../hooks/useFilteredProperties";
import {loadProperties} from "../utils/loadProperties";
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

  const selectedTypes = useFilterStore((state) => state.selectedTypes);
  const selectedFeatures = useFilterStore((state) => state.selectedFeatures);
  const priceRange = useFilterStore((state) => state.priceRange);
  const sizeRange = useFilterStore((state) => state.sizeRange);

  // Calculate active filter count
  const activeFilterCount = (() => {
    let count = 0;
    if (!selectedTypes.has("all") && selectedTypes.size > 0) count++;
    if (selectedFeatures.size > 0) count++;
    if (
      priceRange[0] !== filterConfig.priceRange.min ||
      priceRange[1] !== filterConfig.priceRange.max
    )
      count++;
    if (
      sizeRange[0] !== filterConfig.sizeRange.min ||
      sizeRange[1] !== filterConfig.sizeRange.max
    )
      count++;
    return count;
  })();

  useEffect(() => {
    const properties = loadProperties();
    loadPropertiesData(properties);
  }, [loadPropertiesData]);

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
              {filteredProperties.length} Results in San Francisco
            </h1>
            <MobileFilterButton
              onClick={() => setIsDrawerOpen(true)}
              filterCount={activeFilterCount}
            />
          </div>
          {filteredProperties.length === 0 ? (
            <EmptyState />
          ) : (
            <PropertyGrid properties={filteredProperties} />
          )}
        </main>
      </div>
      <MobileFilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
};
