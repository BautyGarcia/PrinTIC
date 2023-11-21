import { createTRPCRouter } from "~/server/api/trpc";
import { fileRouter } from "./routers/file";
import { userRotuer } from "./routers/user";
import { pedidoRouter } from "./routers/pedido";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  files: fileRouter,
  users: userRotuer,
  pedidos: pedidoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
