# Adding MacPorts to the path
export PATH=/opt/local/bin:/opt/local/sbin:$PATH

# Read from .bashrc
[ -r /Users/rukmal/.bashrc ] && source /Users/rukmal/.bashrc

# Enabling colors in terminal
#===========================
export CLICOLOR=1
# Colors for the terminal
BLUE='\e[0;34m\]'
RED='\e[1;31m\]'
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

# Git aliases
#------------
alias gif='git fetch'
alias gis='git status'
alias gid='git diff'
alias gia='git add -A'
alias gih='git push heroku master'

# Function for git add, commit and push
# Note: Commits ALL files in working directory.
# Usage: gip [commit message] [branch to be push to]
gip () {
	git add -A
	git commit -m "$1";
	git push origin $2;
}

# Function to create and checkout new branch
# Note: Drops all current refs
# Usage: gib [new branch name]
gib () {
    git branch $1
    git checkout $1
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
PS1="\[$BLUE\][\u@\h \W]\[$RED\]\$(parse_git_branch) \[$BLUE\]\$ "
export PS1
