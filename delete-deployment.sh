#!/bin/bash

# remove previous script ( lms-deploy.sh) output
sudo rm -rf lms

# Stop Nginx service
sudo systemctl stop nginx

# Remove Nginx
sudo apt-get purge nginx nginx-common nginx-full nginx-core -y
sudo apt-get autoremove --purge -y
sudo apt-get autoclean
sudo apt-get remove --purge -y

# Remove Node.js
sudo apt-get remove nodejs npm -y

# Remove PostgreSQL and its dependencies
sudo apt-get purge postgresql* -y
sudo apt-get autoremove --purge -y
sudo apt-get autoclean

echo "lms, Nginx, Node.js, and PostgreSQL removed successfully!"
