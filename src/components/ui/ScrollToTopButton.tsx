import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-6 cursor-pointer right-6 bg-primary-600 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50
        ${isVisible ? "opacity-100 visible" : "opacity-0 invisible"}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <FiArrowUp className="h-6 w-6" />
    </button>
  );
};
