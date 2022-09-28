#! /usr/bin/bash

echo "Initializing installation process";
if [ ! -d "../node_modules" ]; 
then 
    cd ../
    npm install -g pnpm nodemon ts-node 
    sleep 1;
    pnpm install
fi