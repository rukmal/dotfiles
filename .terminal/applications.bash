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

# Homebrew
#=========

# Check that we are running macos
if sw_vers > /dev/null 2>&1;
then
    # Check if homebrew is installed on Intel/Apple Silicon MacOS as determined by install path
    # If Intel, homebrew installs in /usr/local/Homebrew
    [ -d "/usr/local/Homebrew" ] &&  export PATH="/usr/local/sbin:$PATH"
    # If Apple Silicon, homebrew installs in /opt/homebrew
    [ -d "/opt/homebrew" ] && export PATH="/opt/homebrew/bin:$PATH"
fi
