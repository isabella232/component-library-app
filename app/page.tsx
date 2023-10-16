"use client";
import React, { useMemo } from "react";
import { Switch } from "@headlessui/react";
import { useRouter } from "next/navigation";

import { useCategories } from "@/contexts/Category";

import CategoryToggle from "@/components/CategoryToggle";
import ComponentGrid from "@/components/ComponentGrid";
import { components } from "@/components/quickflow";

import { ComponentCategories } from "@/types";

const Page = () => {
  const [mounted, setMounted] = React.useState(false);
  const { categories, toggleInclude } = useCategories();
  const router = useRouter();

  const filteredComponents = useMemo(() => {
    const result: Partial<ComponentCategories> = {};
    Object.entries(categories).forEach(([category, include]) => {
      if (include) {
        const key = category as keyof ComponentCategories;
        result[key] = components[key];
      }
    });
    return result;
  }, [categories]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-start relative w-full">
      <div className="flex overflow-hidden w-full">
        <div
          id="sidebar"
          className="border-r border-white/20 w-1/4 flex flex-col h-screen"
        >
          <div id="category-toggle" className="m-3">
            <span className="text-gray-300">Show components for:</span>
            <Switch.Group as="div" className="flex flex-col pt-4">
              {Object.entries(categories).map(([category, include]) => {
                return (
                  <CategoryToggle
                    key={category}
                    category={category}
                    include={include}
                    toggleCategory={() => toggleInclude(category)}
                  />
                );
              })}
            </Switch.Group>
          </div>
        </div>
        <div id="main" className="w-3/4 flex flex-col h-full">
          <div className="flex-grow overflow-auto">
            <ComponentGrid components={filteredComponents} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

