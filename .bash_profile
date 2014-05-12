# Adding MacPorts to the path
export PATH=/opt/local/bin:/opt/local/sbin:$PATH

# Read from .bashrc
[ -r /Users/rukmal/.bashrc ] && source /Users/rukmal/.bashrc

# Enabling colors in terminal
#===========================
export CLICOLOR=1
# Colors for the terminal
BLUE="\[\033[0;34m\]"
RED="\[\033[1;31m\]"
# Custom aliases
#==============

# System function aliases
#------------------------
alias ll='ls -l'
alias la='ls -a'
alias p='pwd'
alias pc='pwd | pbcopy' # Copy current working directory to clipboard
alias v='vim'
alias sl='ls' # Just to reduce the amount of errors I get from this

# Miscellaneous aliases
#----------------------
alias airport='/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport'
alias serve='python -m SimpleHTTPServer'
alias cfind='cat ~/.bash_history | grep $1' # Search for X in bash history

# Git aliases
#------------
alias gif='git fetch' # Fetch from a repo
alias gis='git status' # Current status
alias gia='git add -A' # Add all files to scope
alias gih='git push heroku master' # Push to heroku
alias gich='git checkout $1' # Change to branch X
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

# Function to detect git changes
# Note: Adds all files to git scope
# Usage gid
gid () {
    git add -A
    git diff
}

# Function to get the current git branch
parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

# Bash prompt options (comment the unused ones out)
# PS1="$BLUE\W @ \h (\u)$CYAN`parse_git_branch` $BLUE\$ " # [dirname] @ [host] (user) (git branch) $
PS1="$BLUE[\u@\h \W]$RED\$(parse_git_branch) $BLUE\$ "
export PS1
