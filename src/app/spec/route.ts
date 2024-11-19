import { router } from '@/router'
import { generateOpenAPI } from '@orpc/openapi'

export const GET = (request: Request) => {
  const url = new URL(request.url)

  const spec = generateOpenAPI({
    router,
    info: {
      title: 'ORPC Playground',
      version: '1.0.0',
      description: `
The example OpenAPI Playground for ORPC.

## Resources

* [Github](https://github.com/unnoq/orpc)
* [Documentation](https://orpc.unnoq.com)
          `,
    },
    servers: [{ url: new URL('/api', url).toString() }],
    security: [{ bearerAuth: [] }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
  })

  return new Response(JSON.stringify(spec), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
