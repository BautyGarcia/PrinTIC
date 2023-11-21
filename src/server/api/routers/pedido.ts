import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

export const pedidoRouter = createTRPCRouter({
    crearPedido: protectedProcedure
        .input(z.object({ 
            materia: z.string(), 
            notas: z.string(), 
            piezas: z.array(z.object({ nombre: z.string(), cantidad: z.number(), url: z.string() })) }))
        .mutation(async ({ input, ctx }) => {
            const { materia, notas, piezas } = input;
            const alumnoId = ctx.session?.user?.id;

            const pedido = await ctx.db.pedido.create({
                data: {
                    materia,
                    user: {
                        connect: {
                            id: alumnoId
                        }
                    },
                    fecha: new Date(),
                    observacionesAlumno: notas,
                    piezas: {
                        createMany: {
                            data: piezas
                        }
                    }
                }
            })

            return pedido.id;
        })
});
