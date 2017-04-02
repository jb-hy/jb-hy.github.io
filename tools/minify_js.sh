#!/bin/sh
exec curl -s --data-urlencode 'js_code@-' \
    -d 'compilation_level=SIMPLE_OPTIMIZATIONS' \
    -d 'output_format=text' \
    -d 'output_info=compiled_code' \
    'https://closure-compiler.appspot.com/compile'
