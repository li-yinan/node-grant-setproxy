import sudo from 'sudo-prompt';
import path from 'path';
import fs from 'fs';
import childProcess  from 'child_process';

let exeCmd = path.join(__dirname, '/tools/proxysetup');
let grantCmd = path.join(__dirname, '/tools/grant.sh');
let dialogName = 'title';

function grant() {
    if (!hasGrant()) {
        return new Promise((resolve, reject) => {
            sudo.exec(grantCmd, {name: dialogName}, function (err) {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

function exe(...args) {
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

function hasGrant() {
    let stat = fs.statSync(exeCmd);
    return stat.uid === 0;
}

export function setDialogName(name) {
    dialogName = name;
}

export async function exec(...args) {
    await grant();
    return await exe(...args);
}
