#!/bin/bash
astro_path="/workspaces/Tiny-Website"
amplenote_path="/workspaces/Tiny-Website/notes"
astro_markdown_layout="layout: ../../layouts/BlogPost.astro"
publish_tags=(
  "x-status/publish/project"
  "x-status/publish/blog"
  "x-status/publish/writeup"
  "x-status/publish/read"
  "x-status/publish/weekly"
  "x-status/publish/misc"
  "x-status/publish/sketch" 
)
astro_pages_folder=(
  "project"
  "blog"
  "writeup"
  "read"
  "weekly"
  "misc"
  "sketch"
)
find  "$astro_path/src/" -name "*.md" -type f|xargs rm -v ;   #remove all current markdown file
rm -rf "$astro_path/public/images"
rm -rf "$astro_path/public/attachments"
#format filename
(cd $amplenote_path; rename -e "s/[\[\]{}\s]//g" *.md)

for file in $amplenote_path/*.md
do
  for index in "${!publish_tags[@]}"
  do
    if grep "${publish_tags[index]}" "$file"
    then
      #sed -i 's/\!\[\](images\//\!\[\](https:\/\/images.versun.me\/images\//g' "$file" #use R2 CDN
      sed -i 's/\!\[\](images\//\!\[\](\/images\//g' "$file"
      sed -i 's/\](attachments\//\](\/attachments\//g' "$file"
      sed -i '/^layout:/d' "$file"
      sed -i "1 a $astro_markdown_layout" "$file"
      mv "$file" "$astro_path/src/pages/${astro_pages_folder[index]}/" 
      break
    fi
  done
done
(cd $astro_path/src/; date +"%Y/%m/%d" > lastUpdate.md)
mv "$amplenote_path/images" "$astro_path/public/"
mv "$amplenote_path/attachments" "$astro_path/public/"
(cd $astro_path; npx astro build;)


