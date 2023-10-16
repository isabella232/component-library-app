"use client";
import React, { ReactElement } from "react";
import { isSupportedStyleProperty } from "@/utils/styleChecker";


export async function createComponent(
  name: string,
  reactElement: ReactElement,
) {
  const rootElement = (await webflow.getRootElement()) as DOMElement;
  const ele = await createElementInWebflow(reactElement);

  const currentChildren = rootElement.getChildren();
  rootElement.setChildren([...currentChildren, ele]);
  await rootElement.save();

  const component = await webflow.registerComponent(name, ele);
  const heroComponent = webflow.createInstance(component);

  rootElement.setChildren([...currentChildren, heroComponent]);

  await rootElement.save();
}

async function createElementInWebflow(
  reactElement: ReactElement,
): Promise<DOMElement> {
  const type = reactElement.type.toString();
  let webflowElement: DOMElement;
  webflowElement = webflow.createDOM(type);

  const {
    style: reactElementStyles = {},
    children = [],
    ...restOfProps
  } = reactElement.props;
  await applyStylesToElement(reactElementStyles, reactElement, webflowElement);

  if ("setAttribute" in webflowElement) {
    Object.keys(restOfProps).forEach((propKey) => {
      webflowElement.setAttribute(propKey, restOfProps[propKey]);
    });
  }

  const childrenArr = React.Children.toArray(children);

  if (childrenArr.length !== 0) {
    const outArray = await setChildrenForElement(childrenArr);
    webflowElement.setChildren(outArray);
  }

  return webflowElement;
}

function generateStyleName(prefix: string): string {
  // TODO: pass in the component name and concat that to the end
  return `style-${prefix}-${Math.random().toString(36).substring(2, 7)}`;
}

function setPropertyOrThrowError(
  style: Style,
  propertyKey: string,
  value: string,
): void {
  if (isSupportedStyleProperty(propertyKey)) {
    style.setProperty(propertyKey, value);
  } else {
    throw new Error(
      `The style property ${propertyKey} is not yet supported in Webflow Designer Extensions.`,
    );
  }
}

function isShorthandProperty(property: string): boolean {
  // TODO: Consider also adding: borderBlock, lineClamp, maskBorder, motion, placeItems, placeSelf
  const shorthandProperties: string[] = [
    "all",
    "animation",
    "background",
    "border",
    "border-block-end",
    "border-block-start",
    "border-bottom",
    "border-color",
    "border-image",
    "border-inline-end",
    "border-inline-start",
    "border-left",
    "border-radius",
    "border-right",
    "border-style",
    "border-top",
    "border-width",
    "column-rule",
    "columns",
    "container",
    "contain-intrinsic-size",
    "flex",
    "flex-flow",
    "font",
    "font-synthesis",
    "font-variant",
    "gap",
    "grid",
    "grid-area",
    "grid-column",
    "grid-row",
    "grid-template",
    "inset",
    "list-style",
    "margin",
    "mask",
    "offset",
    "outline",
    "overflow",
    "padding",
    "place-content",
    "place-items",
    "place-self",
    "scroll-margin",
    "scroll-padding",
    "scroll-timeline",
    "text-decoration",
    "text-emphasis",
    "transition",
  ];
  // https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties
  return shorthandProperties.includes(property);
}

async function applyStylesToElement(
  styles: { [key: string]: string },
  reactElement: ReactElement,
  webflowElement: DOMElement | HeadingElement,
) {
  if (Object.keys(styles).length === 0) return;
  const basename = reactElement.type.toString();
  const styleName = generateStyleName(basename);
  let style = await webflow.getStyleByName(styleName);
  if (!style) {
    // TODO: We should validate we have at least one valid style property prior to creating a style.
    style = webflow.createStyle(styleName);
  }

  Object.entries(styles).forEach(([styleKey, value]) => {
    if (typeof value === "string") {
      // Convert camelCase to kebab-case
      const k = styleKey.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      if (isShorthandProperty(k)) {
        throw new Error(
          `Shorthand property ${k} is not supported. Please use longhand properties instead. Refer to https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties for more information.`,
        );
      } else {
        setPropertyOrThrowError(style!, k, value);
      }
    }
  });

  webflowElement.setStyles([style]);
}

async function setChildrenForElement(children: React.ReactNode[]) {
  // TODO: Consider using Promise.all() to speed up this process
  const webflowChildrenArr: AnyElement[] = [];
  for (const child of children) {
    if (typeof child === "string") {
      if (children.length === 1) {
        const ele = webflow.createString(child);
        webflowChildrenArr.push(ele);
      } else {
        const span = await createElementInWebflow(<span>{child}</span>);
        webflowChildrenArr.push(span);
      }
    } else if (React.isValidElement(child)) {
      const ele = await createElementInWebflow(child);
      webflowChildrenArr.push(ele);
    }
  }

  if (webflowChildrenArr.length > 0) {
    return webflowChildrenArr;
  }

  return [];
}
