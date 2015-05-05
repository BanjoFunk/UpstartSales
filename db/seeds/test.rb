admin = User.create(:email => 'admin@bcj.com', :first_name => "Josh", :last_name => "Goodbelly", :password => 'testeroo', :password_confirmation => 'testeroo', :roles => [:admin])
brewer = User.create(:email => 'brewer@bcj.com', :first_name => "Phil", :last_name => "Sunderson", :password => 'testeroo', :password_confirmation => 'testeroo', :roles => [:brewer])
sales = User.create(:email => 'sales@bcj.com', :first_name => "Tania", :last_name => "Tazmania", :password => 'testeroo', :password_confirmation => 'testeroo', :roles => [:sales])
