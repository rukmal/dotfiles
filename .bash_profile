# Adding MacPorts to the path
export PATH=/opt/local/bin:/opt/local/sbin:$PATH

# Adding maven to the path
export PATH=/usr/local/apache-maven-3.2.3/bin:$PATH

# Adding Play! framework activator to the path
export PATH=/usr/local/activator/bin:$PATH

# Adding Jaggery.js to the path
export PATH=/usr/local/jaggery/bin:$PATH

# Read from .bashrc
# Add some kind of if statement that detects whether the bash_profile or the bashrc was read first. Depending on that, pick one to source from the other. If not, this leads to an infinite loop of sourcing bash configs.

# Enabling colors in terminal
#===========================
export CLICOLOR=1
# Colors for the terminal
BLUE="\[\033[0;34m\]"
RED="\[\033[1;31m\]"
# Custom aliases
#==============

# 3rd party app aliases
#----------------------
alias vtop='vtop --theme brew' # launch vtop with 'brew' theme

# System function aliases
#------------------------
alias ll='ls -hl'
alias la='ls -a'
alias p='pwd'
alias pc='pwd | pbcopy' # Copy current working directory to clipboard
alias v='vim'
alias sl='ls' # Just to reduce the amount of errors I get from this

# Fucntion to create and cd into a new directory
# Note: Supports quote-enclosed multi-word filenames
# Useage: cdm [new folder name]
cdm () {
    mkdir $1;
    cd $1
}

# Miscellaneous aliases
#----------------------
alias airport='/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport'
alias serve='python -m SimpleHTTPServer'
alias cfind='cat ~/.bash_history | grep $1' # Search for X in bash history
alias mit='license-generator install mit -n "Rukmal Weerawarana" -y 2014' # Install the MIT license to the LICENSE file

# Adding SSH keys
#----------------
ssh-add .ssh/mullinslab_rsa &> /dev/null

# Programming stuff
#------------------

# Function to create a python virtual environment
# This function also automaticall installs all required
# dependencies if they are listed in a requirements.txt file
initvenv () {
	virtualenv venv
	source venv/bin/activate
	if [ -e requirements.txt ]
	then
		pip install -r requirements.txt
	fi
}

# Function to save all of the installed packages
# to a requirements.txt file
savevenv () {
    pip freeze > requirements.txt
}

# Function to exit a python venv and save all
# installed packages to a requirements.txt file
quitvenv() {
    savevenv
    deactivate
}

# Adding folder with Go code to GOPATH
export GOPATH=/Users/rukmal/Projects/Gocode
# Adding go executables to the path
export PATH=$GOPATH/bin:$PATH

# Git aliases
#------------
alias gif='git fetch' # Fetch from a repo
alias gis='git status' # Current status
alias gia='git add -A' # Add all files to scope
alias gih='git push heroku master' # Push to heroku
alias gich='git checkout $1' # Change to branch X
alias gid='git diff' # Show differences
alias gib='git checkout -b $1' # Make and switch to branch X

# Function for git add, commit and push
# Note: Commits ALL files in working directory.
# Usage: gip [commit message] [branch to be push to]
gip () {
	git add -A
	git commit -m "$1";
	git push origin $2;
}

# Function to delete an existing branch
# Note: PERMANENTLY deletes the branch. (no prompt)
# Usage gibd [branch to be deleted]
gibd () {
    git checkout master
    git branch -D $1
}

# Function for git add and commit
# Note: Commits ALL files in working directory.
# Usage: gic [commit message]
gic () {
	git add -A
	git commit -m "$1"
}

# Function to get the current git branch
parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

# Bash prompt options (comment the unused ones out)
# PS1="$BLUE\W @ \h (\u)$CYAN`parse_git_branch` $BLUE\$ " # [dirname] @ [host] (user) (git branch) $
PS1="$BLUE[\u@\h \W]$RED\$(parse_git_branch) $BLUE\$ "
export PS1

