@echo off

echo "Starting installation process"
cd ../
npm install -g pnpm nodemon ts-node
pnpm install
exit