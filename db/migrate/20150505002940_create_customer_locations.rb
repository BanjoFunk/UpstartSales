class CreateCustomerLocations < ActiveRecord::Migration
  def change
    create_table :customer_locations do |t|
      t.integer :customer_id
      t.string :short_name
      t.string :address_1
      t.string :address_2
      t.string :city
      t.string :state
      t.string :zip
      t.timestamps

    end
  end
end
