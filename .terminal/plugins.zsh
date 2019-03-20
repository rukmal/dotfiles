# Plugin stuff

# iTerm2 Shell Integration

test -e "${HOME}/.iterm2_shell_integration.zsh" && source "${HOME}/.iterm2_shell_integration.zsh"

# Autocompletion plugins
antigen bundle git # https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins#git
antigen bundle heroku # https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins#heroku
antigen bundle pip # https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins#pip
antigen bundle brew # https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins#brew
antigen bundle kubectl # https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins#kubectl
antigen bundle python # https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins#python
antigen bundle docker # https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins#docker
antigen bundle extract # https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins#extract
antigen bundle osx # https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/osx
antigen bundle jsontools # https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins#jsontools
antigen bundle zsh-users/zsh-syntax-highlighting # https://github.com/zsh-users/zsh-syntax-highlighting

# zsh-nvm plugin
# See: https://github.com/lukechilds/zsh-nvm
export NVM_LAZY_LOAD=true  # Do not load on start, only do so when called
antigen bundle lukechilds/zsh-nvm
