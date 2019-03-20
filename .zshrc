# Author: Rukmal Weerawarana
# Description: zsh configuration file

# Notes
#--------
# 1. If you see an error, 'complete:13: command not found: compdef' on startup, see: https://unix.stackexchange.com/questions/339954/zsh-command-not-found-compinstall-compinit-compdef

# Path to oh-my-zsh installation.
export ZSH="/Users/rukmal/.oh-my-zsh"

# Antigen is currently being used for plugin management
# This can be installed on *nix with a package manager
# Antigen Page: https://github.com/zsh-users/antigen
# Antigen Installation: https://github.com/zsh-users/antigen/wiki/Installation

# Activating antigen
source /usr/local/share/antigen/antigen.zsh

# Setting antigen to use the oh-my-zsh library
antigen use oh-my-zsh

# Setting up the theme
# See: https://github.com/bhilburn/powerlevel9k/wiki/Install-Instructions#option-4-install-for-antigen

POWERLEVEL9K_INSTALLATION_PATH=$ANTIGEN_BUNDLES/bhilburn/powerlevel9k
antigen theme bhilburn/powerlevel9k powerlevel9k

# Source .bash and .zsh files in .terminal directory
for f in ~/.terminal/{*.bash,*.zsh}; do source $f; done
