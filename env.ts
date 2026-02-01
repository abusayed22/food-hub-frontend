import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';



export const env = createEnv({
    server: {
        BETTER_AUTH_URL:z.url(),
        FRONTEND_BASE_URL:z.url(),
        BACKEND_BASE_URL:z.url(),
    },
    // only client
    client:{
        NEXT_PUBLIC_TEST:z.string(),
        NEXT_PUBLIC_FRONTEND_BASE_URL:z.string(),
        NEXT_PUBLIC_BETTER_AUTH_URL:z.string(),
    },
    // run time
    runtimeEnv:{
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
        NEXT_PUBLIC_TEST:process.env.NEXT_PUBLIC_TEST,
        FRONTEND_BASE_URL:process.env.FRONTEND_BASE_URL,
        NEXT_PUBLIC_FRONTEND_BASE_URL:process.env.NEXT_PUBLIC_FRONTEND_BASE_URL,
        BACKEND_BASE_URL:process.env.BACKEND_BASE_URL,
        NEXT_PUBLIC_BETTER_AUTH_URL:process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    },
})