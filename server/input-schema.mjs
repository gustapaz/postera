export const inputSchema = {
  type: "object",
  additionalProperties: false,
  required: ["message", "delay_seconds", "paper"],
  properties: {
    message: { type: "string", minLength: 1, maxLength: 280 },
    delay_seconds: { type: "integer", minimum: 60, maximum: 518400 },
    paper: { type: "string", enum: ["ivory", "rose", "night"] },
  },
};
