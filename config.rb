require 'compass-normalize'

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'
#set :build_dir, 'a:\SetDirectory'

configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :relative_assets
end