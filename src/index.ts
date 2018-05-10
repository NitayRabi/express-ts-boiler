import { App } from './app';
import { sampleRouter } from './routers';

/**
 * Main entry file.
 * you can start your app here, passing an array of routers for the app to use.
 * process level stuff happens here
 */
new App([sampleRouter]);

// Handler for unhandled rejections
process.on('unhandledRejection', function (reason, p) {
    console.error("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
});


