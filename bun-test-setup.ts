/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost'
});

global.window = dom.window as any;
global.document = dom.window.document as any;
global.navigator = dom.window.navigator as any;
global.HTMLElement = dom.window.HTMLElement as any;
global.customElements = dom.window.customElements as any;

global.requestAnimationFrame = (callback) => setTimeout(callback, 0) as any;
global.cancelAnimationFrame = (id) => clearTimeout(id as any);

global.IS_REACT_ACT_ENVIRONMENT = true;
