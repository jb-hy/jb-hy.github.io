#!/bin/bash

SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
DEST_DIR="$(dirname "${SCRIPT_DIR}")"
SRC_DIR="${DEST_DIR}/src"

egrep -rne '[[:space:]]+$' "${SRC_DIR}/"* && exit 1
egrep -rne "$(echo -ne "\\t")" "${SRC_DIR}/"* && exit 1

for src in "${SRC_DIR}/"*'.html'; do
    dest="${DEST_DIR}/$(basename "${src}")"
    "${SCRIPT_DIR}/minify_html.sh" < "${src}" > "${dest}"
done

for ext in 'css' 'js'; do
    for src in "${SRC_DIR}/"*".${ext}"; do
        dest="${DEST_DIR}/$(basename "${src}" ".${ext}").min.${ext}"
        "${SCRIPT_DIR}/minify_${ext}.sh" < "${src}" > "${dest}"
    done
done

