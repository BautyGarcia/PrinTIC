import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure
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
});
