class CreateCustomerContact < ActiveRecord::Migration
  def change
    create_table :customer_contacts do |t|
      t.integer :customer_id
      t.boolean :primary
      t.string :first_name
      t.string :last_name
      t.string :phone
      t.string :email
      t.string :position
      t.timestamps

    end
  end
end
