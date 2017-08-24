" Vundle

set nocompatible
filetype off

set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Plugin 'jonathanfilip/vim-lucius'
Plugin 'fholgado/minibufexpl.vim'
Plugin 'scrooloose/syntastic'
Plugin 'vim-scripts/Align'
Plugin 'vim-pandoc/vim-rmarkdown'
Plugin 'severin-lemaignan/vim-minimap'

call vundle#end()
filetype plugin indent on


" Misc editor features

set autoindent
set nobackup
set ruler
set suffixes=.bak,~,.swp,.o,.info,.aux,.log,.dvi,.bbl,.blg,.brf,.cb,.ind,.idx,.ilg,.inx,.out,.toc
set showcmd
set showmatch
set ignorecase
set incsearch
set autowrite
set ttimeout
set ttimeoutlen=0


" Misc preferences
nnoremap ; :
nnoremap Y y$
au InsertEnter * :set nu
au InsertLeave * :set rnu
set nu
autocmd BufRead,BufNewFile * setlocal nospell
set viminfo=


" Remove trailing whitespace on save

function! <SID>StripTrailingWhitespaces()
  " Preparation: save last search, and cursor position.
  let _s=@/
  let l = line('.')
  let c = col('.')
  " Do the business:
  %s/\s\+$//e
  " Clean up: restore previous search history, and cursor position
  let @/=_s
  call cursor(l, c)
endfunction
filetype plugin on
autocmd BufWritePre * call <SID>StripTrailingWhitespaces()

" Setting the background color to dark blue
:highlight Normal ctermfg=grey ctermbg=darkblue

" Setting tab size
:set tabstop=4

" Substituting spaces for tabs when tab key is pressed
:set expandtab

" Adding bracket auto complete
:imap ( ()<left>
:imap { {}<left>
:imap [ []<left>

" Theme
set t_co=256

colorscheme solarized
syntax enable
