## EDR - API

### Installtion
- run `npm install` to install all dependencies

### Compiling
- run `npm run build` (under the hood uses `tsc`)

### Build folder
- all compiled `js` files under `dist` folder

### Startup
- the app is managed with `pm2` using `processes.config.js` for process configuration
- use `pm2` cli to manage status and logs.

### Logs
- Currently didn't implement logs - on the TODO list.

### Configuration
- configuration for various enviorments can be done in config folder `**enviorment-name**.json`
#### Structure
- `index.ts` - entry file (manages server startup)
- `app.ts` - main app logic
    - App level middlewares
    - Router definitions
- `routers` folder
    - `xxxx.router.ts` - router file. contains express router.
- `controllers` folder
    - `xxxx.controller` - controller file - contains express route functions.
- `services` folder
    - contains various services for general and specific purposes.
- `models` folder - contains abstract classes, interfaces, enums, helpers and constants
