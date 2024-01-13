import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure
} from "~/server/api/trpc";
import bcrypt from "bcrypt";

export const userRotuer = createTRPCRouter({
    crearCuenta: publicProcedure
        .input(z.object({ name: z.string(), email: z.string(), password: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { email, password, name } = input;

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = ctx.db.user.create({
                data: {
                    email,
                    curso: "Profe",
                    name,
                    password: hashedPassword,
                    role: "TEACHER",
                }
            })

            return user;
        }),
    cambiarPassword: protectedProcedure
        .input(z.object({ password: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { password } = input;
            const userId = ctx.session.user.id;

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            try {
                await ctx.db.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        password: hashedPassword,
                        isPasswordChanged: true
                    }
                })

                return { status: "Success", message: "La contraseña se cambio correctamente" }
            } catch {
                throw new Error("Hubo un problema cambiando la contraseña");
            }
        }),
    isPasswordChanged: publicProcedure
        .input(z.object({ email: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { email } = input;

            const user = await ctx.db.user.findUnique({
                where: {
                    email
                }
            })

            if (!user) {
                throw new Error("Email incorrecto");
            }

            return user.isPasswordChanged
        }),
});
