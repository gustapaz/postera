import { Aurelia, CustomElement } from "aurelia";
import { model } from "./model";
import { motionToggle } from "./client";
class Desk {
  version = 0;
  remaining = "";
  a = model("postera", () => {
    this.version++;
    this.countdown();
  });
  d = this.a.d;
  attached() {
    this.a.init();
    setInterval(() => this.countdown(), 1000);
  }
  countdown() {
    const c = this.d.current;
    if (!c?.published) {
      this.remaining = "";
      return;
    }
    const localNow = Date.now() / 1000;
    this.remaining = Math.max(0, Math.ceil(c.opens_at - localNow)) + " s";
  }
  change(key: string, value: any) {
    this.a.change(key, value);
  }
  reload() {
    if (this.d.current) this.a.open(this.d.current.id);
  }
  date(value: number) {
    return new Date(value * 1000).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "medium",
    });
  }
  seal() {
    this.a.share();
  }
  inputMessage(e: Event) {
    this.change("message", (e.target as HTMLTextAreaElement).value);
  }
  inputTitle(e: Event) {
    this.a.title((e.target as HTMLInputElement).value);
  }
  inputDelay(e: Event) {
    this.change("delay_seconds", +(e.target as HTMLSelectElement).value);
  }
}
import template from "./desk.html?raw";

document.querySelector("#app-root")!.replaceChildren();
const component = CustomElement.define({ name: "postal-desk", template }, Desk);
Aurelia.app({ host: document.querySelector("#app-root")!, component }).start();
let paused = false;
motionToggle((v) => (paused = v));
let pending = false;
const scroll = () => {
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => {
    const el = document.querySelector<HTMLElement>(".hero-envelope");
    if (el)
      el.style.setProperty(
        "--unfold",
        paused
          ? "1"
          : String(Math.min(1, Math.max(0, scrollY / (innerHeight * 0.7)))),
      );
    pending = false;
  });
};
window.addEventListener("scroll", scroll, { passive: true });
scroll();
if (new URL(location.href).searchParams.has("record"))
  document.querySelector("#desk")?.scrollIntoView();
