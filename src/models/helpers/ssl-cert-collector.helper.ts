import * as fs from 'fs';

export function getSslCerts(keyPath: string, certPath: string, caPath: string): { key: Buffer, cert: Buffer, ca: Buffer } {
    /**
     * Why cwd() ? - for root project folder (ui_web_edr)
     * @type {Buffer}
     */
    try {
        const key = fs.readFileSync(keyPath);
        const cert = fs.readFileSync(certPath);
        const ca = fs.readFileSync(caPath);
        return { key, cert, ca };
    } catch (err) {
        console.log(`An error occurred while getting certs - ${err}`);
    }

}

export function getSslClientCert(caPath: string) {
    try {
        return fs.readFileSync(caPath);
    } catch (err) {
        console.log(`An error occurred while getting certs - ${err}`);
    }
}
