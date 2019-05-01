# Anaconda 3
#============

export PATH="/Users/rukmal/Applications/anaconda3/bin:$PATH"  # Command line utility

. /Users/rukmal/Applications/anaconda3/etc/profile.d/conda.sh  # Enabling 'conda activate'

# Ruby
#=====
export PATH="/usr/local/opt/ruby/bin:$PATH"

# Kubernetes
#============

if [ $commands[kubectl] ]; then
    source <(kubectl completion zsh);
fi
