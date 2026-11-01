import { test } from "node:test";
import assert from "node:assert/strict";
import { service } from "../server/service.mjs";
test("compute metadata contains no plaintext message", () => {
  const r = service.compute(service.meta.default_input);
  assert.ok(!JSON.stringify(r).includes(service.meta.default_input.message));
  assert.ok(r.characters > 0);
});
test("Unicode and trimmed text retained", () => {
  const v = service.validate({
    ...service.meta.default_input,
    message: "  Olá, amanhã 🌙  ",
  });
  assert.equal(v.message, "Olá, amanhã 🌙");
});
test("delay range includes exact limits", () => {
  for (const delay_seconds of [60, 518400])
    assert.equal(
      service.compute({ ...service.meta.default_input, delay_seconds })
        .delay_seconds,
      delay_seconds,
    );
});
test("blank unknown or out of bounds rejected", () => {
  for (const p of [
    { ...service.meta.default_input, message: " " },
    { ...service.meta.default_input, delay_seconds: 59 },
    { ...service.meta.default_input, delay_seconds: 518401 },
    { ...service.meta.default_input, extra: 1 },
  ])
    assert.throws(() => service.compute(p));
});
test("export is plain text not executable markup", () => {
  const r = service.export({
    ...service.meta.default_input,
    message: "<script>example</script>",
  });
  assert.ok(r.type.startsWith("text/plain"));
  assert.ok(r.text.includes("<script>example</script>"));
});
