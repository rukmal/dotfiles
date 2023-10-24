# Convenience
#============

alias ll='ls -hl'
alias la='ls -a'
alias v='nvim'
alias sl='ls' # Just to reduce the amount of errors I get from this

alias htop='sudo htop' # 'sudo' for complete process visibility


# Networking
#===========

alias wifi-off='sudo ifconfig en0 off'
alias wifi-on='sudo ifconfig en0 on'

restart-wifi () {
	sudo ifconfig en0 down
	sudo ifconfig en0 up
}

# Git
#====

alias gis='git status' # Current status
alias gia='git add -A' # Add all files to scope
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

# Function for git add and commit
# Note: Commits ALL files in working directory.
# Usage: gic [commit message]
gic () {
	git add -A
	git commit -m "$1"
}

# Function to delete an existing branch
# Note: PERMANENTLY deletes the branch. (no prompt)
# Usage gibd [branch to be deleted]
gibd () {
    git checkout master
    git branch -D $1
}

