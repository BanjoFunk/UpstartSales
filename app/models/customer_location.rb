class CustomerLocation < ActiveRecord::Base
  belongs_to :customer
  has_many :comments, :as => :commentable
  attr_accessor :DT_RowId


end