"use client";

import Image from "next/image";
import { useState } from "react";
import ComponentModal from "@/components/ComponentModal";
import { Component } from "@/types";
import { createComponent } from "@/utils/webflow";

export default function ComponentCard({ component }: { component: Component }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getUniqueTitle = (title: string) => {
    return `${title} (${Math.random().toString(36).substring(2, 7)})`;
  };

  const onAddComponent = () => {
    createComponent(getUniqueTitle(component.title), component.element);
  };

  return (
    <li
      key={component.id}
      className="col-span-1 flex bg-white text-center flex-none items-start m-0 bg-white/10 rounded shadow-sm flex-col space-y-1 p-2 relative"
    >
      <div
        className="flex items-center h-[150px] relative w-full bg-white/20 p-2 border-0"
        onClick={openModal}
      >
        <Image
          src={component.previewImage}
          alt={component.title}
          className="object-contain mx-auto relative bg-transparent"
        />
      </div>
      <span className="text-gray-300 text-sm">{component.title}</span>
      <button
        type="button"
        className="rounded bg-white/10 w-full px-2 py-1 text-sm text-white hover:bg-white/20"
        onClick={onAddComponent}
      >
        Add Component
      </button>
      {isModalOpen && (
        <ComponentModal
          onAddComponent={onAddComponent}
          title={component.title}
          previewImage={component.previewImage}
          open={isModalOpen}
          closeModal={closeModal}
        />
      )}
    </li>
  );
}
