# Check if .bash_rc is loaded, if not load it
if [ -f ~/.bashrc ]; then
  . ~/.bashrc
fi

# Custom Env Variables
#=====================

# Adding MacPorts to the path
export PATH=/opt/local/bin:/opt/local/sbin:$PATH

# Adding Play! framework activator to the path
export PATH=/usr/local/activator/bin:$PATH

# Adding Jaggery.js to the path
export PATH=/usr/local/jaggery/bin:$PATH

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
alias mit='license-generator install mit -n "Rukmal Weerawarana" -y $(date +%Y)' # Install the MIT license to the LICENSE file
alias vergil='ssh rukmal@vergil.u.washington.edu'
alias change-hostname='scutil --set HostName $1' # Change computer hostname (Note: sudo still required)

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

###############
# starflt-cmd specific
###############
if [[ "$HOSTNAME" = "macbook" ]]
then
    alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome" # Creating alias for google chrome
    alias htop="sudo htop" # Sudo priviledges to monitor all tasks
    alias mathematica="/Applications/Mathematica.app/Contents/MacOS/WolframKernel" # Creating alias for Mathematica
    alias sca="/System/Library/Frameworks/ScreenSaver.framework/Resources/ScreenSaverEngine.app/Contents/MacOS/ScreenSaverEngine" # Shortcut to start screensaver

    # Add qt clang to the path
    export PATH=/Applications/Utilities/Qt/5.4/clang_64/bin:$PATH
    # Add NVIDIA CUDA toolkit
    export PATH=/Developer/NVIDIA/CUDA-8.0/bin:$PATH

    #######################
    # starflt-cmd functions
    #######################

    # Function to connect to and tunnel all traffic through the Tor circuit
    tor-on () {
        tor RunAsDaemon 1
        sudo networksetup -setsocksfirewallproxy Wi-Fi localhost 9050
        sudo networksetup -setsocksfirewallproxystate Wi-Fi on
        echo "New Wi-Fi proxy settings:"
        sudo networksetup -getsocksfirewallproxy Wi-Fi
    }

    # Function to turn off and stop tunneling traffic through the Tor circuit
    tor-off () {
        sudo networksetup -setsocksfirewallproxystate Wi-Fi off
        killall tor > /dev/null 2>&1
        if [ $? -eq 0 ] # If killall gave 0 as exit code, it was successful
        then
            echo "Tor Network tunneling stopped successfully"
        else
            echo "It look like something went wrong. Was tor running?"
        fi
    }
fi

# Anaconda (conda)
export PATH="/Applications/anaconda/bin:$PATH"

# pkg-config path
export PKG_CONFIG_PATH=/usr/local/Cellar/zeromq/4.0.5_2/lib/pkgconfig:$PKG_CONFIG_PATH
alias python=python2.7
alias py=python3.5

# added by Anaconda3 4.1.1 installer
export PATH="/Users/rukmal/Applications/anaconda/bin:$PATH"

test -e "${HOME}/.iterm2_shell_integration.bash" && source "${HOME}/.iterm2_shell_integration.bash"

# Sourcing pure theme
source /Users/rukmal/.iterm2/prompts/pure_prompt.bash

# Set CLICOLOR if you want Ansi Colors in iTerm2
export CLICOLOR=1

# Set colors to match iTerm2 Terminal Colors
export TERM=xterm
eval $(/usr/libexec/path_helper -s)
