admin = User.create(:email => 'admin@bcj.com', :first_name => "Josh", :last_name => "Goodbelly", :password => 'testeroo', :password_confirmation => 'testeroo', :roles => [:admin])
brewer = User.create(:email => 'brewer@bcj.com', :first_name => "Phil", :last_name => "Sunderson", :password => 'testeroo', :password_confirmation => 'testeroo', :roles => [:brewer])
sales = User.create(:email => 'sales@bcj.com', :first_name => "Tania", :last_name => "Tazmania", :password => 'testeroo', :password_confirmation => 'testeroo', :roles => [:sales])

cust1 = Customer.create(:name => 'test1', :user_id => 1, :distributor_id => 2, :price_tier_id => 1, :state => 0)
cust2 = Customer.create(:name => 'test2', :user_id => 1, :distributor_id => 2, :price_tier_id => 1, :state => 1)
cust3 = Customer.create(:name => 'test3', :user_id => 1, :distributor_id => 2, :price_tier_id => 1, :state => 2)
cust4 = Customer.create(:name => 'test4', :user_id => 1, :distributor_id => 2, :price_tier_id => 1, :state => 2)

cust1.customer_locations.create(:customer_id => "1", :short_name => "Home", :address_1 => "2877 Shadow Creek Dr.", :address_2 => "#203", :city => "Boulder", :state => "CO", :zip => 80303)
cust2.customer_locations.create(:customer_id => "1", :short_name => "Home", :address_1 => "2877 Shadow Creek Dr.", :address_2 => "#203", :city => "Boulder", :state => "CO", :zip => 80303)
cust3.customer_locations.create(:customer_id => "1", :short_name => "Home", :address_1 => "2877 Shadow Creek Dr.", :address_2 => "#203", :city => "Boulder", :state => "CO", :zip => 80303)
cust4.customer_locations.create(:customer_id => "1", :short_name => "Home", :address_1 => "2877 Shadow Creek Dr.", :address_2 => "#203", :city => "Boulder", :state => "CO", :zip => 80303)