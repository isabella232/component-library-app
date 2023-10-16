"use client";
import { ReactElement } from "react";
import { StaticImageData } from "next/image";

export interface Component {
  id: string;
  title: string;
  previewImage: StaticImageData;
  element: ReactElement;
}

export interface ComponentCategories {
  [key: string]: Component[];
}
