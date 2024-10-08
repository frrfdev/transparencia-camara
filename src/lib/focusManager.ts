import findTabbable from './tabbable';

let focusLaterElements: (Element | null)[] = [];
let modalElement: HTMLElement | null = null;
let needToFocus = false;

/* eslint-disable no-console */
/* istanbul ignore next */
export function resetState() {
  focusLaterElements = [];
}

/* istanbul ignore next */
export function log() {
  if (process.env.NODE_ENV !== 'production') {
    console.log('focusManager ----------');
    focusLaterElements.forEach((f) => {
      const check = f || ({} as Element);
      console.log(check.nodeName, check.className, check.id);
    });
    console.log('end focusManager ----------');
  }
}
/* eslint-enable no-console */

export function handleBlur() {
  needToFocus = true;
}

export function handleFocus() {
  if (needToFocus) {
    needToFocus = false;
    if (!modalElement) {
      return;
    }
    // need to see how jQuery shims document.on('focusin') so we don't need the
    // setTimeout, firefox doesn't support focusin, if it did, we could focus
    // the element outside of a setTimeout. Side-effect of this implementation
    // is that the document.body gets focus, and then we focus our element right
    // after, seems fine.
    setTimeout(() => {
      if (modalElement?.contains(document.activeElement)) {
        return;
      }
      if (!modalElement) return;
      const el = findTabbable(modalElement)[0] || modalElement;
      el.focus();
    }, 0);
  }
}

export function markForFocusLater(element?: Element) {
  if (element) return focusLaterElements.push(element);
  focusLaterElements.push(document.activeElement);
}

export function returnFocus(preventScroll = false) {
  let toFocus = null;
  try {
    if (focusLaterElements.length !== 0) {
      toFocus = focusLaterElements.pop();
      (toFocus as HTMLElement)?.focus({ preventScroll });
    }
    return;
  } catch (e) {
    console.warn(
      [
        'You tried to return focus to',
        toFocus,
        'but it is not in the DOM anymore',
      ].join(' ')
    );
  }
}

export function popWithoutFocus() {
  if (focusLaterElements.length > 0) focusLaterElements.pop();
}

export function setupScopedFocus(element: Element) {
  modalElement = element as HTMLElement;

  if (window.addEventListener) {
    window.addEventListener('blur', handleBlur, false);
    document.addEventListener('focus', handleFocus, true);
  } else {
    window.attachEvent('onBlur', handleBlur);
    document.attachEvent('onFocus', handleFocus);
  }
}

export function teardownScopedFocus() {
  modalElement = null;

  window.removeEventListener('blur', handleBlur);
  document.removeEventListener('focus', handleFocus);
}
