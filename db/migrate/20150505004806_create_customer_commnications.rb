class CreateCustomerCommnications < ActiveRecord::Migration
  def change
    create_table :customer_communications do |t|
      t.integer :customer_id
      t.integer :type
      t.string :communicated_with
      t.text :notes
      t.timestamps
    end
  end
end
