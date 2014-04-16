# Change bash prompt
export PS1="\W @ \h (\u) \$ "

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

# System function aliases
#------------------------
alias ll="ls -l"
alias la="ls -a"
alias p="pwd"

# Git aliases
#------------
alias push='git push'
alias pull='git pull'
alias fetch='git fetch'
alias gis='git status'

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
