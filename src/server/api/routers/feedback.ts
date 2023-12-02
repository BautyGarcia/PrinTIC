import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure
} from "~/server/api/trpc";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

export const feedbackRouter = createTRPCRouter({
    mandarFeedback: publicProcedure
    .input(z.object({ texto: z.string() }))
    .mutation(async ({ input, ctx }) => {
        const { texto } = input;
    
        await ctx.db.feedback.create({
            data: {
                texto,
                fecha: new Date(),
            }
        })

        try {
            const info = await transporter.sendMail({
                from: 'PrinTIC <contact.printic@gmail.com>',
                to: "bautyroccogarcia@gmail.com",
                subject: 'Nueva sugerencia',
                html: `<p>Sugerencia: ${texto}</p>`,
            });

            console.log('Message sent: %s', info.messageId);
        } catch (error) {
            throw new Error("Error mandando sugerencia");
        }

        return true;
    }),
});
