# ZSH Prompt Definition/Customization
# This was created using the guide here: https://github.com/bhilburn/powerlevel9k#prompt-customization

# NOTE: If this is slow, try cleaning log files (*.asl) here: /private/var/log/asl/

# Defining to not show 'context' if this is the user
# DEFAULT_USER=rukmal

# Put prompt on new line
POWERLEVEL9K_PROMPT_ON_NEWLINE=true

# Add new line between prompts
POWERLEVEL9K_PROMPT_ADD_NEWLINE=true

# Setting icons for folders
POWERLEVEL9K_HOME_ICON='🏠'
POWERLEVEL9K_HOME_SUB_ICON='📂'
POWERLEVEL9K_FOLDER_ICON='🖥'
POWERLEVEL9K_ETC_ICON='⚙️'

# Git stuff - function to get current git branch
parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
POWERLEVEL9K_CUSTOM_PARSE_GIT_BRANCH_BACKGROUND='green'
POWERLEVEL9K_CUSTOM_PARSE_GIT_BRANCH='parse_git_branch'

# Setting template for printing hostname
POWERLEVEL9K_CONTEXT_TEMPLATE="%n@`hostname -s`"

# More efficient way of getting Anaconda environment
POWERLEVEL9K_CUSTOM_ANACONDA_ENV='echo "$CONDA_DEFAULT_ENV"'

# Define left side stuff
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(dir custom_parse_git_branch)

# Define right side stuff
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(custom_anaconda_env time context)
