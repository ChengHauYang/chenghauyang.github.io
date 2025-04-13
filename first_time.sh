git checkout --orphan gh-pages
git rm -rf .
cp -r _site/* .
touch .nojekyll
git add .
git commit -m "deploy website"
git push -f origin gh-pages

