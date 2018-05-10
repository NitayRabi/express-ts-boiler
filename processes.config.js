const path = require('path');

function truePath(str) {
  return path.join(__dirname, str);
}

const envDev = {
    NODE_ENV: "development",
    NODE_CONFIG_DIR: truePath("./config")
};

const envProd = {
    NODE_ENV: "production",
    NODE_CONFIG_DIR: truePath("./config")
};

const watchOptions = {
    awaitWriteFinish: {
        stabilityThreshold: 4000
    }
};

const apps = [
    {
        name: "api",
        script: truePath("./dist/index.js"),
        watch: [truePath(".dist/")],
        instance_var: 'INSTANCE_ID',
        env: envDev,
        env_production: envProd,
        watch_options: watchOptions
    }
];

module.exports = {
    apps: apps
};
