# ZSH Prompt Definition/Customization
# This was created using the guide here: https://github.com/bhilburn/powerlevel9k#prompt-customization

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

# Setting template for printing hostname
POWERLEVEL9K_CONTEXT_TEMPLATE="%n@`hostname -s`"

# Define left side stuff
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(dir vcs)

# Define right side stuff
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(anaconda time context)