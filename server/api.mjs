import { compose } from "@hattip/compose";
import { service } from "./service.mjs";
import { routeTable, simpleDispatch } from "./routes.mjs";
import { guarded, errorResponse } from "./transport.mjs";
export function createApi(db, clock) {
  const dispatch = simpleDispatch(routeTable(db, service, clock));
  const pipeline = compose(
    async (context) => {
      context.handleError = (error) =>
        errorResponse(error, crypto.randomUUID());
      context.locals.product = "postera";
      return context.next();
    },
    (context) => dispatch(context.request),
  );
  return guarded((req) =>
    pipeline({
      request: req,
      platform: {},
      env: {},
      ip: "127.0.0.1",
      waitUntil() {},
      passThrough() {},
    }),
  );
}
