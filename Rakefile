DEPLOY_DIR = '~/_Sandbox/GmailGridView'

desc "Build the website from source"
task :build do
	puts "## Building website"
	status = system("bundle exec middleman build --clean")
	puts status ? "OK" : "FAILED"
end

desc "Deploy website via robocopy"
task :deploy, :os do |t, args|
	os = args[:os] || 'nix'
	if os == 'win'
		puts "## Copying build to #{DEPLOY_DIR}"
		status = system("robocopy build #{DEPLOY_DIR} /Z /E")
	else
		puts "## Copying build to #{DEPLOY_DIR}"
		status = system("sudo rsync -avz --no-perms build/ #{DEPLOY_DIR}")
	end
end

desc "Build and deploy website to the sandbox"
task :sandbox => [:build, :deploy] do
end
