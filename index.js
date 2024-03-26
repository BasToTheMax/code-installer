const c = require('ansi-colors');
const sh = require('shelljs');
const fs = require('fs');
const { log } = console;

if (!sh.which('apt')) {
    log(
        c.red('ERROR'),
        c.blueBright('apt is required for this script to run!')
    );
    process.exit(1);
} else {
    log(c.green('> Found apt'));
}

sh.exec('apt update -y');
sh.exec('apt install curl wget sudo htop -y');
sh.exec('curl -fsSL https://code-server.dev/install.sh | sh');

sh.exec('systemctl enable --now code-server@root');

var path = '/root/.config/code-server/config.yaml';
var r = '';

sh.exec('mkdir ' + path);

var os = require("os");
var hostname = os.hostname();
var vpsID = parseInt(String(hostname).replace('vps', ''));

r += `bind-addr: 0.0.0.0:3${vpsID}1`;
r += 'auth: password';
r += 'cert: false';
r += 'password: ' + `code${vpsID}`

fs.writeFileSync(path, r);

log(
    c.green('[OK]'),
    `Installed at http://185.234.69.13:3${vpsID}1/ with password code${vpsID}`
);
log(
    c.blue('[TIP]'),
    `Don't forget to change the password at ${path}!`
);
