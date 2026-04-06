#!/bin/sh

rm -rf .next

npm run build
#for window
#comment this line if your OS is not window
# xcopy //e //h //y //z //d //exclude:exclusionList.txt "..\frontend" "..\Production\frontend"

#for linux
#comment this line if your OS is not linux
cp //e //h //y //z //d //exclude:exclusionList.txt "..\frontend" "..\Production\frontend"