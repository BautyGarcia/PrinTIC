import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import type { Materia, Estado } from "@prisma/client";

export const pedidoRouter = createTRPCRouter({
    crearPedido: protectedProcedure
        .input(z.object({
            materia: z.string(),
            notas: z.string(),
            piezas: z.array(z.object({ nombre: z.string(), cantidad: z.number(), url: z.string() }))
        }))
        .mutation(async ({ input, ctx }) => {
            const { materia, notas, piezas } = input;

            const pedido = await ctx.db.pedido.create({
                data: {
                    materia: materia as Materia,
                    user: {
                        connect: {
                            id: ctx.session?.user?.id
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
        }),
    getAllPedidos: publicProcedure
        .input(z.object({}))
        .query(async ({ ctx }) => {
            const pedidos = await ctx.db.pedido.findMany({
                select: {
                    id: true,
                    aprobador: true,
                    materia: true,
                    observacionesAlumno: true,
                    observacionesProfesor: true,
                    estado: true,
                    fecha: true,
                    user: {
                        select: {
                            name: true,
                            curso: true,
                        }
                    },
                    piezas: {
                        select: {
                            nombre: true,
                            cantidad: true,
                            url: true,
                        }
                    }
                },
                orderBy: {
                    fecha: "desc",
                }
            });

            return pedidos;
        })
});
