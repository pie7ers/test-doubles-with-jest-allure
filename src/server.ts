import app from './app';
import CONFIG_SERVER from '../consts/server';
import 'colors'

const PORT = CONFIG_SERVER.PORT

function startServer(): void {
  app.listen(PORT, () => {
    console.log(`server started PORT: ${PORT} 🟢`.green)
  })
}

startServer()