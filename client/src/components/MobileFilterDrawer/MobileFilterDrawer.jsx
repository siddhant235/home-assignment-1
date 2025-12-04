import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {FaTimes} from "react-icons/fa";
import {FilterSection} from "../FilterSection/FilterSection";
import {TypeFilter} from "../FilterSection/TypeFilter";
import {PriceRangeFilter} from "../FilterSection/PriceRangeFilter";
import {SizeFilter} from "../FilterSection/SizeFilter";
import {FeaturesFilter} from "../FilterSection/FeaturesFilter";
import styles from "./MobileFilterDrawer.module.css";

export const MobileFilterDrawer = ({isOpen, onClose, children}) => {
  const drawerRef = useRef(null);
  const previousFocusRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle mounting/unmounting with animation delay
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Reset animation state when opening
      setIsAnimating(false);
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Trigger animation after component is mounted and closed state is painted
  useLayoutEffect(() => {
    if (isOpen && shouldRender && drawerRef.current) {
      // Force a synchronous reflow to ensure closed state is painted
      void drawerRef.current.offsetHeight;

      // Trigger animation on next frame
      const frameId = requestAnimationFrame(() => {
        setIsAnimating(true);
      });

      return () => cancelAnimationFrame(frameId);
    }
  }, [isOpen, shouldRender]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Store the element that had focus before opening drawer
      previousFocusRef.current = document.activeElement;
      // Focus the drawer when it opens
      setTimeout(() => {
        const closeButton = drawerRef.current?.querySelector(
          `.${styles.closeButton}`
        );
        if (closeButton) {
          closeButton.focus();
        }
      }, 100);
    } else {
      document.body.style.overflow = "";
      // Return focus to the element that opened the drawer
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);

  // Trap focus within drawer
  useEffect(() => {
    if (!isOpen) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusableElements = drawer.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    drawer.addEventListener("keydown", handleTabKey);
    return () => {
      drawer.removeEventListener("keydown", handleTabKey);
    };
  }, [isOpen]);

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <div
        className={`${styles.overlay} ${
          isAnimating && isOpen ? styles.overlayOpen : styles.overlayClosed
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={drawerRef}
        className={`${styles.drawer} ${
          isAnimating && isOpen ? styles.drawerOpen : styles.drawerClosed
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-drawer-title"
        aria-hidden={!isOpen}
      >
        <div className={styles.header}>
          <h2 id="filter-drawer-title" className={styles.title}>
            Filter
          </h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close filters"
          >
            <FaTimes aria-hidden="true" />
          </button>
        </div>
        <div className={styles.content}>
          <FilterSection>
            <TypeFilter />
            <PriceRangeFilter />
            <SizeFilter />
            <FeaturesFilter />
          </FilterSection>
        </div>
      </div>
    </>
  );
};
