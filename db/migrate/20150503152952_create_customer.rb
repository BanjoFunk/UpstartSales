class CreateCustomer < ActiveRecord::Migration
  def change
    create_table :customers do |t|
      t.string :name, null: false
      t.integer :state
      t.integer :distributor_id
      t.integer :user_id
      t.integer :price_tier_id
      t.integer :sort_position
      t.timestamps
    end
  end
end
