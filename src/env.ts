import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_DATOCMS_API_TOKEN: z.string(),
  NEXT_PUBLIC_DATOCMS_BASE_URL: z
    .string()
    .default('https://graphql.datocms.com/'),
})

const parseEnv = envSchema.safeParse(process.env)

if (!parseEnv.success) {
  console.error(
    'Invalid enviroment variables:',
    parseEnv.error.flatten().fieldErrors,
  )

  throw new Error('Invalid enviroment variables')
}

export const env = parseEnv.data
