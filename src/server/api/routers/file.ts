import { z } from "zod";
import { Storage } from "@google-cloud/storage";
import {
    createTRPCRouter,
    protectedProcedure
} from "~/server/api/trpc";

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
    }
});

interface responseProps {
    fetchUrl: string;
    fileUrl: string;
}

export const fileRouter = createTRPCRouter({
    signFiles: protectedProcedure
        .input(z.object({ fileNames: z.array( z.string()) }))
        .mutation(async ({ input }) => {
            const { fileNames } = input;

            const expires = Date.now() + 15 * 60 * 1000;
            const bucket = storage.bucket(process.env.PROJECT_ID ?? "");
            const response: Array<responseProps> = [];

            for (const fileName of fileNames) {
                const [url] = await bucket.file(fileName).getSignedUrl({
                    action: "write",
                    version: "v4",
                    expires,
                    contentType: "application/octet-stream",
                })

                response.push({ 
                    fetchUrl: url, 
                    fileUrl: `https://storage.cloud.google.com/${process.env.PROJECT_ID}/${fileName}` 
                });
            }

            return response;
        }),
});
