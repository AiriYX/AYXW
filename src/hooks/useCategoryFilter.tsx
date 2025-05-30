// src/hooks/useCategoryFilter.tsx
import { useState, useMemo } from "react";

export function useCategoryFilter(allCategories: string[]) {
  const [activeCategories, setActiveCategories] = useState<string[]>(["All"]);

  const toggleCategory = (category: string) => {
    setActiveCategories((prevCategories) => {
      if (category === "All") {
        return ["All"];
      } else {
        const updatedCategories = prevCategories.filter((cat) => cat !== "All");

        if (updatedCategories.includes(category)) {
          const newCategories = updatedCategories.filter(
            (cat) => cat !== category
          );
          return newCategories.length === 0 ? ["All"] : newCategories;
        } else {
          return [...updatedCategories, category];
        }
      }
    });
  };

  const filterContent = <T extends { category?: string[]; mood?: string[] }>(
    content: T[],
    type: "articles" | "poems"
  ) => {
    if (activeCategories.includes("All")) {
      return content;
    }

    return content.filter((item) => {
      const itemCategories = type === "articles" ? item.category : item.mood;
      if (!itemCategories) return false;
      return activeCategories.some((activeCat) =>
        itemCategories.includes(activeCat)
      );
    });
  };

  return { activeCategories, toggleCategory, filterContent };
}
