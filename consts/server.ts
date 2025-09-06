import 'dotenv/config'
import env from 'env-var'

const MILLISECONDS = 1000
const ENABLE = true
const DISABLE = false

export default {
  PORT: env.get('PORT').default(3000).asInt(),
  DISABLE_SSL_CERTIFICATION_AXIOS: env.get('DISABLE_SSL_CERTIFICATION_AXIOS').default('false').asBool(),
  DEFAULT_TIMEOUT: env.get('DEFAULT_TIMEOUT').default(30).asInt() * MILLISECONDS,
  ENABLE,
  DISABLE,
}