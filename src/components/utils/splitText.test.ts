import { test, expect, mock, beforeEach, afterEach, describe } from "bun:test";
import { GlobalWindow } from "happy-dom";

mock.module("gsap", () => ({
  gsap: {
    registerPlugin: mock(),
    fromTo: mock(),
  }
}));

mock.module("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {}
}));

import setSplitText from "./splitText";
import { gsap } from "gsap";

describe("setSplitText", () => {
  let window: GlobalWindow;

  beforeEach(() => {
    window = new GlobalWindow();
    global.window = window as any;
    global.document = window.document as any;

    // Reset mocks
    (gsap.registerPlugin as import("bun:test").Mock<any>).mockClear();
    (gsap.fromTo as import("bun:test").Mock<any>).mockClear();
  });

  afterEach(() => {
    delete (global as any).window;
    delete (global as any).document;
  });

  test("returns early if window.innerWidth < 900", () => {
    global.window.innerWidth = 800;

    const div = global.document.createElement("div");
    div.classList.add("para");
    div.innerText = "test";
    global.document.body.appendChild(div);

    setSplitText();

    expect(div.innerHTML).toBe("test"); // Inner HTML won't change because it returns early
    expect(gsap.fromTo).not.toHaveBeenCalled();
  });

  test("bails out on elements that already have the 'split-ready' class", () => {
    global.window.innerWidth = 1000;

    const para = global.document.createElement("div");
    para.classList.add("para", "split-ready");
    para.innerText = "hello world";
    global.document.body.appendChild(para);

    const title = global.document.createElement("div");
    title.classList.add("title", "split-ready");
    title.innerText = "title";
    global.document.body.appendChild(title);

    setSplitText();

    expect(para.innerHTML).toBe("hello world"); // Should not be modified
    expect(title.innerHTML).toBe("title");
    expect(gsap.fromTo).not.toHaveBeenCalled();
  });

  test("splits .para elements into individual word span elements", () => {
    global.window.innerWidth = 1000;

    const para = global.document.createElement("div");
    para.classList.add("para");
    para.innerText = "hello world";
    global.document.body.appendChild(para);

    setSplitText();

    expect(para.classList.contains("split-ready")).toBe(true);

    // Check if it created spans
    const spans = para.querySelectorAll("span");
    expect(spans.length).toBe(2);
    expect(spans[0].innerText).toBe("hello ");
    expect(spans[1].innerText).toBe("world ");
    expect(spans[0].style.display).toBe("inline-block");

    // Check gsap
    expect(gsap.fromTo).toHaveBeenCalledTimes(1);

    const callArgs = (gsap.fromTo as import("bun:test").Mock<any>).mock.calls[0];
    expect(callArgs[0]).toBe(para.children); // targets
    expect(callArgs[1]).toEqual({ opacity: 0, y: 30 }); // from
    expect(callArgs[2].opacity).toBe(1); // to
    expect(callArgs[2].scrollTrigger.trigger).toBe(para);
    expect(callArgs[2].scrollTrigger.start).toBe("top 60%"); // because width <= 1024
  });

  test("splits .title elements into individual character span elements", () => {
    global.window.innerWidth = 1200;

    const title = global.document.createElement("div");
    title.classList.add("title");
    title.innerText = "hi!";
    global.document.body.appendChild(title);

    setSplitText();

    expect(title.classList.contains("split-ready")).toBe(true);

    // Check if it created spans
    const spans = title.querySelectorAll("span");
    expect(spans.length).toBe(3);
    expect(spans[0].innerText).toBe("h");
    expect(spans[1].innerText).toBe("i");
    expect(spans[2].innerText).toBe("!");
    expect(spans[0].style.display).toBe("inline-block");

    // Check gsap
    expect(gsap.fromTo).toHaveBeenCalledTimes(1);

    const callArgs = (gsap.fromTo as import("bun:test").Mock<any>).mock.calls[0];
    expect(callArgs[0]).toBe(title.children); // targets
    expect(callArgs[1]).toEqual({ opacity: 0, y: 50, rotate: 5 }); // from
    expect(callArgs[2].opacity).toBe(1); // to
    expect(callArgs[2].scrollTrigger.trigger).toBe(title);
    expect(callArgs[2].scrollTrigger.start).toBe("20% 60%"); // because width > 1024
  });

  test("evaluates TriggerStart correctly depending on window width (> 1024)", () => {
    global.window.innerWidth = 1200; // > 1024

    const para = global.document.createElement("div");
    para.classList.add("para");
    para.innerText = "hello";
    global.document.body.appendChild(para);

    setSplitText();

    const callArgs = (gsap.fromTo as import("bun:test").Mock<any>).mock.calls[0];
    expect(callArgs[2].scrollTrigger.start).toBe("20% 60%");
  });

  test("handles spaces correctly in titles", () => {
    global.window.innerWidth = 1200;

    const title = global.document.createElement("div");
    title.classList.add("title");
    title.innerText = "a b";
    global.document.body.appendChild(title);

    setSplitText();

    const spans = title.querySelectorAll("span");
    expect(spans.length).toBe(3);
    expect(spans[0].innerText).toBe("a");
    expect(spans[1].innerText).toBe("\u00A0"); // Non-breaking space
    expect(spans[2].innerText).toBe("b");
  });
});
