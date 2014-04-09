# Added by install_latest_perl_osx.pl
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
alias l="ls"
alias c="cd"
alias ll="ls -l"
alias la="ls -a"

# Git aliases
#------------
alias push='git push'
alias pull='git pull'

# Function for git commit and push
# Usage: gg [files to include](optional) [commit message] [branch to be push to]
function gp () {
	if [$1 -ne ""]; then
		git add $1;
	fi
	git commit -m "$2";
	git push origin $3;
}