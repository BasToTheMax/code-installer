const c = require('ansi-colors');
const sh = require('shelljs');
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
sh.exec('apt install software-properties-common curl apt-transport-https ca-certificates gnupg -y');
sh.exec('LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php');

sh.exec('curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg');
sh.exec('echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list');

sh.exec('curl -sS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | sudo bash');
sh.exec('apt update -y')

sh.exec('apt -y install php8.1 php8.1-{common,cli,gd,mysql,mbstring,bcmath,xml,fpm,curl,zip} mariadb-server nginx tar unzip git redis-server');

sh.exec('curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer');

sh.exec('mkdir -p /var/www/pterodactyl');