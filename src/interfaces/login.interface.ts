import { z } from "zod";
import { loguinUserSchema } from "../schemas/login.schema";

export type ILoginUser = z.infer<typeof loguinUserSchema>