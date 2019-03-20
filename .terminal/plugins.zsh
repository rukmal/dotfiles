# Plugin stuff

# iTerm2 Shell Integration
test -e "${HOME}/.iterm2_shell_integration.zsh" && source "${HOME}/.iterm2_shell_integration.zsh"

# Autocompletion plugins
antigen bundle zsh-users/zsh-syntax-highlighting # https://github.com/zsh-users/zsh-syntax-highlighting

# zsh-nvm plugin
# See: https://github.com/lukechilds/zsh-nvm
export NVM_LAZY_LOAD=true  # Do not load on start, only do so when called
antigen bundle lukechilds/zsh-nvm
