import { DeepPartial } from 'typeorm';
import { z } from 'zod';
import { createScheduleSchema, returnAllScheduleSchema, returnScheduleSchema } from '../schemas/schedule.schema';


export type IScheduleUser = z.infer<typeof createScheduleSchema>;

export type IScheduleUserDeep = DeepPartial<IScheduleUser>;

export type IScheduleReturn = z.infer<typeof returnScheduleSchema>;

export type IAllUserReturn = z.infer<typeof returnAllScheduleSchema>;

