import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import type { Estado, Materia } from "@prisma/client";
import path from "path";
import nodemailer from 'nodemailer';
import { cambioEstadoTemplate } from "~/utils/emailTemplates";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

const imagePath = path.join(process.cwd(), 'public', 'ticLogo.png');
const attachments = [
    {
        filename: 'ticLogo.png',
        path: imagePath,
        cid: 'ticLogo'
    }
];

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
                            email: true,
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
        }),
    getPedidoById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            const { id } = input;

            const pedido = await ctx.db.pedido.findUnique({
                where: {
                    id,
                },
                select: {
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
            });

            return pedido;
        }),
    cambiarEstado: protectedProcedure
        .input(z.object({ id: z.string(), estado: z.string(), motivos: z.string().optional(), studentEmail: z.string().optional(), studentName: z.string().optional(), teacherId: z.string().optional(), teacherName: z.string().optional() }))
        .mutation(async ({ input, ctx }) => {
            const { id, estado, motivos, studentEmail, studentName, teacherId, teacherName } = input;

            await ctx.db.pedido.update({
                where: {
                    id
                },
                data: {
                    estado: estado as Estado,
                    observacionesProfesor: motivos,
                    aprobador: {
                        connect: {
                            id: teacherId
                        }
                    }
                }
            })

            const needMotivos = estado === "CON_ERRORES" || estado === "DENEGADO";
            try {
                const info = await transporter.sendMail({
                    from: 'PrinTIC <contact.printic@gmail.com>',
                    to: studentEmail,
                    subject: 'Se ha cambiado el estado de tu impresión',
                    html: cambioEstadoTemplate(studentName ?? "", estado, teacherName ?? "", motivos ?? "", needMotivos), attachments
                });

                console.log('Message sent: %s', info.messageId);
            } catch (error) {
                throw new Error("Error mandando mail");
            }
            
            return true;
        }),
});
