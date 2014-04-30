# Adding MacPorts to the path
export PATH=/opt/local/bin:/opt/local/sbin:$PATH

# Read from .bashrc
[ -r /Users/rukmal/.bashrc ] && source /Users/rukmal/.bashrc

# Enabling colors in terminal
#===========================
export CLICOLOR=1
# Colors for the terminal
GRAY="\[\033[1;30m\]"
LIGHT_GRAY="\[\033[0;37m\]"
CYAN="\[\033[0;36m\]"
LIGHT_CYAN="\[\033[1;36m\]"
NO_COLOUR="\[\033[0m\]"
BLUE="\e[0;34m"
RED="\e[1;31m"

# Custom aliases
#==============

# Mullins lab (work related) aliases
#----------------------------------
alias outthemis='ssh -p 2222 -i ~/.ssh/public_key -t rukmal@zeus.mullins.microbiol.washington.edu ssh themis'
alias outthercules='ssh -p 2222 -i ~/.ssh/public_key -t rukmal@zeus.mullins.microbiol.washington.edu ssh hercules'

# System function aliases
#------------------------
alias ll='ls -l'
alias la='ls -a'
alias p='pwd'
alias pc='pwd | pbcopy' # Copy current working directory to clipboard
alias v='vim'
alias sl='ls' # Just to reduce the amount of errors I get from this

# System 'hack' aliases
#----------------------
alias airport='/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport'

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
# Note: Switches current branch to master
# Usage gibd [branch to be deleted]
gibd () {
    git checkout master
    git branch -d $1
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
