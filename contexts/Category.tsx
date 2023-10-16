"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { components } from "@/components/quickflow";

export interface Category {
  category: string;
  include: boolean;
}

export interface Categories {
  [key: string]: boolean;
}

interface CategoryContextProps {
  categories: Categories;
  toggleInclude: (category: keyof Categories) => void;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined,
);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const defaultCategories: Categories = {};
  Object.keys(components).forEach((category) => {
    defaultCategories[category] = true;
  });
  const [categories, setCategories] = useState(defaultCategories);

  const toggleInclude = (category: keyof Categories) => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      [category]: !prevCategories[category],
    }));
  };

  return (
    <CategoryContext.Provider value={{ categories, toggleInclude }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
}
