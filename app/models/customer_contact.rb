class CustomerContact < ActiveRecord::Base
  belongs_to :customer
  has_many :comments, :as => :commentable


end