import { Express } from 'express';
import { Address } from '../../entities/address.entity';

declare global {
    namespace Express {
        interface Request {
            user: {
                id: number,
                admin: string
            }
        }
    }
}