/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */

const DISPLAY_NONE = 'none';
const DISPLAY_CONTENTS = 'contents';

// match the whole word to prevent fuzzy searching
const tabbableNode = /^(input|select|textarea|button|object|iframe)$/;

function isNotOverflowing(element: HTMLElement, style: CSSStyleDeclaration) {
  return (
    style.getPropertyValue('overflow') !== 'visible' ||
    // if 'overflow: visible' set, check if there is actually any overflow
    (element.scrollWidth <= 0 && element.scrollHeight <= 0)
  );
}

function hidesContents(element: HTMLElement) {
  const zeroSize = element.offsetWidth <= 0 && element.offsetHeight <= 0;

  // If the node is empty, this is good enough
  if (zeroSize && !element.innerHTML) return true;

  try {
    // Otherwise we need to check some styles
    const style = window.getComputedStyle(element);
    const displayValue = style.getPropertyValue('display');
    return zeroSize
      ? displayValue !== DISPLAY_CONTENTS && isNotOverflowing(element, style)
      : displayValue === DISPLAY_NONE;
  } catch (exception) {
    // eslint-disable-next-line no-console
    console.warn('Failed to inspect element style');
    return false;
  }
}

function visible(element: HTMLElement) {
  let parentElement = element;
  const rootNode = element.getRootNode && element.getRootNode();
  while (parentElement) {
    if (parentElement === document.body) break;

    // if we are not hidden yet, skip to checking outside the Web Component
    if (
      rootNode &&
      parentElement === rootNode &&
      rootNode instanceof ShadowRoot
    ) {
      parentElement = rootNode.host.parentElement as HTMLElement;
    }

    if (hidesContents(parentElement as HTMLElement)) return false;
    parentElement = parentElement.parentElement as HTMLElement;
    if (!parentElement) break;
  }
  return true;
}

function focusable(element: HTMLElement, isTabIndexNotNaN: boolean) {
  const nodeName = element.nodeName.toLowerCase();
  const res =
    (tabbableNode.test(nodeName) && !(element as HTMLInputElement).disabled) ||
    (nodeName === 'a'
      ? (element as HTMLAnchorElement).href || isTabIndexNotNaN
      : isTabIndexNotNaN);
  return res && visible(element);
}

function tabbable(element: HTMLElement) {
  const tabIndex = element.getAttribute('tabindex');
  const isTabIndexNaN = tabIndex === null ? true : isNaN(Number(tabIndex));
  return (
    (isTabIndexNaN || (Number(tabIndex) ?? -1) >= 0) &&
    focusable(element, !isTabIndexNaN)
  );
}

export default function findTabbableDescendants(
  element: HTMLElement
): HTMLElement[] {
  const descendants = Array.prototype.slice
    .call(element.querySelectorAll('*'), 0)
    .reduce(
      (finished, el) =>
        finished.concat(
          !el.shadowRoot ? [el] : findTabbableDescendants(el.shadowRoot)
        ),
      []
    );
  return descendants.filter(tabbable);
}
