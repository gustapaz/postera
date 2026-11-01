import { object, string, integer, enums, size, assert } from "superstruct";
import { fail } from "./errors.mjs";
const schema = object({
  message: size(string(), 1, 280),
  delay_seconds: size(integer(), 60, 518400),
  paper: enums(["ivory", "rose", "night"]),
});
export const meta = {
  slug: "postera",
  title: "PÓSTERA",
  engine: "hattip-superstruct-timecapsule",
  headline: "Nem toda palavra é para agora.",
  default_input: {
    message: "Para um amanhã que ainda não existe: continue criando.",
    delay_seconds: 60,
    paper: "ivory",
  },
  presets: [
    {
      name: "Daqui a um minuto",
      input: {
        message: "Um pequeno intervalo também muda o olhar.",
        delay_seconds: 60,
        paper: "ivory",
      },
    },
    {
      name: "Amanhã",
      input: {
        message: "Que o amanhã encontre espaço para uma ideia nova.",
        delay_seconds: 86400,
        paper: "rose",
      },
    },
    {
      name: "Em seis dias",
      input: {
        message: "Uma pausa antes do próximo começo.",
        delay_seconds: 518400,
        paper: "night",
      },
    },
  ],
  note: "Demonstração com mensagens sintéticas, sem criptografia ponta a ponta. O selo impede leitura pela API até o relógio do servidor autorizar. Nunca use informações pessoais ou segredos reais.",
};
export function validate(input) {
  try {
    assert(input, schema);
    if (
      !input.message.trim() ||
      /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(input.message)
    )
      throw new Error();
    return { ...input, message: input.message.trim() };
  } catch {
    fail(
      "invalid_input",
      "Mensagem de 1–280 caracteres, papel válido e espera de 60 s–6 dias.",
    );
  }
}
export function compute(raw) {
  const p = validate(raw);
  return {
    characters: [...p.message].length,
    words: p.message.split(/\s+/u).length,
    paper: p.paper,
    delay_seconds: p.delay_seconds,
    delay_label:
      p.delay_seconds < 3600
        ? Math.ceil(p.delay_seconds / 60) + " min"
        : p.delay_seconds < 86400
          ? Math.ceil(p.delay_seconds / 3600) + " h"
          : Math.ceil(p.delay_seconds / 86400) + " dias",
  };
}
export function exportResult(input) {
  const p = validate(input);
  return {
    type: "text/plain; charset=utf-8",
    extension: "txt",
    text: "PÓSTERA · CARTA DIGITAL\n\n" + p.message + "\n\nEstudo sintético.\n",
  };
}
export const service = { meta, validate, compute, export: exportResult };
