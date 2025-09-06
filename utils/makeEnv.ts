import { DoesTheFileExist, WriteFile } from './filesControl'
import path from 'path'
import pc from 'picocolors'
const ENV_PATH = path.join(__dirname, '../.env')

const ENV =`# DISABLE_SSL_CERTIFICATION_AXIOS=0/false/null this will disable ssl certiciation of axios
DISABLE_SSL_CERTIFICATION_AXIOS=0

PORT=3000

#USE BOOLEANS TO TURN ON OR TURN OFF
DEBUG_SERVICE_CONSOLE=1
#add quantity in seconds
DEFAULT_TIMEOUT=30
GLOBAL_EXPECTED_RESPONSE_TIME=3
`

if(!DoesTheFileExist(ENV_PATH)) {
    WriteFile(ENV_PATH, ENV)
    console.log(pc.green(`.env created`))
}
else console.log(pc.yellow(`.env already exits`))
