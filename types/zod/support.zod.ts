import { z } from "zod";

export const supportZod = z.object({
    url: z.string().url(),
    text: z.number()
})