# Author: Rukmal Weerawarana
# Script to setup the dotfiles, and put everything in the correct place
# This script assumes the repository has been cloned into the 'dotfiles'
# directory in the home folder
# WARNING: This script assumes ST3, iTerm2, and Node.js are installed
# NOTE: Only works on Mac OS X
#======================================================================

echo "Moving all dotfiles to the home directory..."
mv ~/dotfiles/.* .. &> /dev/null
echo $'Done...\n'

echo "Copying iTerm2 preferences to ~/Libaray/Preferences/"
cp ~/.iterm2/com.googlecode.iterm2.plist ~/Library/Preferences/
echo $'Done...\n'

echo "Copying Sublime Text 3 Preferences to ~/Library/Application Support/Sublime Text 3/Packages/User/"
cp ~/.st3/Preferences.sublime-settings ~/Library/Application\ Support/Sublime\ Text\ 3/Packages/User/
echo $'Done...\n'

echo "Installing select Node-based dependencies..."
sudo npm install -g license-generator
sudo npm install -g grunt-cli
echo $'Done...\n'

echo "Operation completed successfully."
