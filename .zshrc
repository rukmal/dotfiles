# Author: Rukmal Weerawarana
# Description: zsh configuration file

# Source .bash and .zsh files in .terminal directory
for f in ~/.terminal/*.bash; do source $f; done

eval "$(starship init zsh)"
