"let g:neomake_javascript_eslint_maker = {
    "\ 'args': ['-f compact'],
    "\ 'errorformat': '%A%f: line %l\, col %v\, %m \(%t%*\d\)',
    "\ }
"let g:neomake_javascript_enabled_makers = ['eslint']
"
set makeprg=echo\ '.\ -f\ compact\ %'\ \\\|\ nc\ localhost\ `cat\ ~/.eslint_d_port`
set errorformat+=%E%f:\ line\ %l\\,\ col\ %c\\,\ Error\ -\ %m
set errorformat+=%W%f:\ line\ %l\\,\ col\ %c\\,\ Warning\ -\ %m
