import sudo from 'sudo-prompt';
import path from 'path';
import fs from 'fs';
import childProcess  from 'child_process';

let exeCmd = path.join(__dirname, '/tools/proxysetup');

export function grant() {
    if (!hasGrant()) {
        let cmd = `chown 0:0 ${exeCmd};chmod u+s ${exeCmd}`;
        return new Promise((resolve, reject) => {
            sudo.exec(cmd, {name: 'darp'}, function (err) {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

export function exe(...args) {
    let cmd = `${exeCmd} ${args.join(' ')}`;
    return new Promise((resolve, reject) => {
        childProcess.exec(cmd, (error, stdout, stderr) => {
            if (error && !stderr) {
                return reject(error);
            }
            resolve({stdout, stderr});
        });
    });
}

export function hasGrant() {
    let stat = fs.statSync(exeCmd);
    return stat.uid === 0;
}

export async function exec(...args) {
    await grant();
    return await exe(...args);
}

// exec('-setwebproxystate', 'wi-fi', 'on');
