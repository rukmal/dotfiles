# Author: Rukmal Weerawarana
# Description: zsh configuration file

# Notes
#--------
# 1. If you see an error, 'complete:13: command not found: compdef' on startup, see: https://unix.stackexchange.com/questions/339954/zsh-command-not-found-compinstall-compinit-compdef
#    Note that this solution requires that the added code to .zshrc be place BEFORE antigen in loaded.
# 2. If autocompletions are behaving weird, see: https://github.com/bhilburn/powerlevel9k/wiki/Troubleshooting#deletion-of-characters-when-tab-completing
#    Note that this solution didn't actually work for me; I just had to disable some of the autocompletions. See: https://github.com/bhilburn/powerlevel9k/wiki/Install-Instructions#option-2-install-for-oh-my-zsh

# Path to oh-my-zsh installation.
export ZSH="/Users/rukmal/.oh-my-zsh"

# >>>>>>>>>Lines configured by zsh-newuser-install
HISTFILE=~/.histfile
HISTSIZE=1000
SAVEHIST=1000
bindkey -e
# End of lines configured by zsh-newuser-install
# The following lines were added by compinstall
zstyle :compinstall filename '/Users/rukmal/.zshrc'

autoload -Uz compinit
compinit
# End of lines added by compinstall<<<<<<<<<<<


# Antigen is currently being used for plugin management
# This can be installed on *nix with a package manager
# Antigen Page: https://github.com/zsh-users/antigen
# Antigen Installation: https://github.com/zsh-users/antigen/wiki/Installation

# Activating antigen
source /usr/local/share/antigen/antigen.zsh

# Setting antigen to use the oh-my-zsh library
antigen use oh-my-zsh

# Autocompletion Plugins
antigen bundle esc/conda-zsh-completion  # Anaconda autocompletion
antigen bundle zpm-zsh/ssh  # SSH hosts autocompletion
antigen bundle aws  # AWS things
SHOW_AWS_PROMPT=false

# Setting up the theme
# See: https://github.com/bhilburn/powerlevel9k/wiki/Install-Instructions#option-4-install-for-antigen

POWERLEVEL9K_INSTALLATION_PATH=$ANTIGEN_BUNDLES/bhilburn/powerlevel9k
antigen theme bhilburn/powerlevel9k powerlevel9k

# Source .bash and .zsh files in .terminal directory
for f in ~/.terminal/{*.bash,*.zsh}; do source $f; done

# Apply antigen settings
antigen apply

# NOTE: Figure out why you are using antigen

# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/Users/rukmal/opt/anaconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/Users/rukmal/opt/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/Users/rukmal/opt/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/Users/rukmal/opt/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<

