class CreateState < ActiveRecord::Migration
  def change
    create_table :states do |t|
      t.integer :user_id
      t.integer :state_id
      t.integer :stateable_id
      t.integer :stateable_type
      t.timestamps
    end
    add_index :states, :stateable_id
  end
end
