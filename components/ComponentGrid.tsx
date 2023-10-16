"use client";

import { Component, ComponentCategories } from "@/types";
import ComponentCard from "@/components/ComponentCard";

export default function ComponentGrid({
  components,
}: {
  components: Partial<ComponentCategories>;
}) {
  const getComponents = () => {
    const c: Component[] = [];
    for (const category of Object.keys(
      components,
    ) as (keyof ComponentCategories)[]) {
      const componentArray = components[category];
      if (componentArray) {
        for (const component of componentArray) {
          c.push(component);
        }
      }
    }
    return c;
  };

  return (
    <ul role="list" className="m-2 grid gap-2 grid-cols-2">
      {getComponents().map((component) => (
        <ComponentCard key={component.id} component={component} />
      ))}
    </ul>
  );
}
