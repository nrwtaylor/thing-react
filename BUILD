NGINX location block

location / {
  root /var/www/thing-react;
  try_files $uri /index.html;
}

sudo npm run build
cd /var/www/thing-react-test/build
sudo cp -r . /var/www/thing-react
sudo service nginx restart
