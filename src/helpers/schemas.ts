import {z} from 'zod';

export const playerSchema = z.object({
  name: z.string(),
  displayName: z.string().optional(),
  score: z.number(),
  maisonID: z.number().optional(),
});

export type Player = z.infer<typeof playerSchema>;

export function playerParser(data: any): Player | undefined {
  let result = playerSchema.safeParse(data);
  if (!result.success) {
    console.error(result.error);
    return undefined;
  }
  return result.data;
}
