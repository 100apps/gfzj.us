---
layout: post
title: "vim 自动补全插件"
date: 2017-12-05 19:23:21 +800
categories: 
by: gf
description: 通过 API 自动补全
---

~/.vim/plugin/aktasksautocomplete.vim 文件：

```
" ----------------------------------------------------------------------------
" auto complete ak tasks
" ----------------------------------------------------------------------------
function! AKTaskComplete() abort
  let prefix = matchstr(strpart(getline('.'), 0, col('.') - 1), '[.a-zA-Z0-9_/-]*$')
  echohl WarningMsg
  echo 'list all *Aone* tasks'
  echohl None

ruby << EOF
  require 'json'
  cmd="ak tasks";
  query = VIM::evaluate('prefix').strip
  if !query.empty?
    cmd.concat "|grep -i #{query}"
  end

  data = `#{cmd}`
  data = data.gsub(/ +/,' ')
  tasks=[]
  data.split("\n").each do |line|
  line = line[0..line.rindex(" ")].strip;
  tasks.push({word:line});
  end

  VIM::command("let cands = #{JSON.dump tasks}")
EOF

  if !empty(cands)
    inoremap <buffer> <c-v> <c-n>
    augroup _AKTaskComplete
      autocmd!
      autocmd CursorMovedI,InsertLeave * iunmap <buffer> <c-v>
            \| autocmd! _AKTaskComplete
    augroup END

    call complete(col('.') - strchars(prefix), cands)
  endif
  return ''
endfunction

```

~/.vimrc 中追加：


```
inoremap <c-f> <c-r>=AKTaskComplete()<cr>
```

这样在 insert 模式中，按下 ctrl+f 就可以自动补全了。并且会把紧邻的第一个单词作为搜索关键词。

