@ECHO OFF

title Batch scripting cm4025/1900745

echo Batch scripting started ........


git clone https://github.com/simonka0808/cm4025_cw.git 

move ".env" "./cm4025_cw/calculator"

call npm install

npx nodemon index.js

