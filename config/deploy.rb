require "capistrano/node-deploy"

set :application, "pouchvision"
set :repository,  "git@github.com:/benrudolph/pouchvision"
set :scm, :git
set :user, :deploy
set :deploy_to, "/var/www/#{application}"
set :use_sudo, false
set :app_command, 'app.js'
set :keep_releases, 5
set :node_env, 'production'

role :web, "176.58.105.165"                          # Your HTTP server, Apache/etc
role :app, "176.58.105.165"                          # This may be the same as your `Web` server
role :db,  "176.58.105.165", :primary => true
role :db,  "176.58.105.165"


# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts
#
