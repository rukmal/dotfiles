# Change bash prompt
export PS1="\W @ \h (\u) \$ "

# Adding MacPorts to the path
export PATH=/opt/local/bin:/opt/local/sbin:$PATH

# Read from .bashrc
[ -r /Users/rukmal/.bashrc ] && source /Users/rukmal/.bashrc

# Enabling colors in terminal
#===========================
export CLICOLOR=1
# Color scheme for 'light' terminal themes
export LSCOLORS=GxFxCxDxBxegedabagaced # Color scheme for 'light' terminal themes
# export LSCOLORS=ExFxBxDxCxegedabagacad # Color scheme for 'dark' terminal themes

# Custom aliases
#==============

# Mullins lab (work related) aliases
#----------------------------------
alias outthemis='ssh -p 2222 -i ~/.ssh/public_key -t rukmal@zeus.mullins.microbiol.washington.edu ssh themis'
alias outthercules='ssh -p 2222 -i ~/.ssh/public_key -t rukmal@zeus.mullins.microbiol.washington.edu ssh hercules'
alias inhercules='ssh rukmal@hercules'
alias inthemis='ssh rukmal@themis'

# System function aliases
#------------------------
alias ll='ls -l'
alias la='ls -a'
alias p='pwd'

# System 'hack' aliases
#----------------------
alias airport='/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport'

# Git aliases
#------------
alias gif='git fetch'
alias gis='git status'
alias gid='git diff'
alias gia='git add -A'

# Function for git add, commit and push
# Note: Commits ALL files in working directory.
# Usage: gip [commit message] [branch to be push to]
gip () {
	git add -A
	git commit -m "$1";
	git push origin $2;
}

# Function for git add and commit
# Note: Commits ALL files in working directory.
# Usage: gic [commit message]
gic () {
	git add -A
	git commit -m "$1"
}
