# Anaconda 3
#============

export PATH="/Users/$(whoami)/Applications/anaconda3/bin:$PATH"  # Command line utility

. /Users/$(whoami)/Applications/anaconda3/etc/profile.d/conda.sh  # Enabling 'conda activate'

# Ruby
#=====

export PATH="/usr/local/opt/ruby/bin:$PATH"  # Ruby command line
export PATH="$HOME/.gem/ruby/2.6.0/bin:$PATH"  # Executable ruby gems

# Kubernetes
#============

if [ $commands[kubectl] ]; then
    source <(kubectl completion zsh);
fi
