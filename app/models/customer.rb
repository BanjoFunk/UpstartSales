class Customer < ActiveRecord::Base
  has_many :comments, :as => :commentable
  has_many :customer_contacts
  has_many :customer_locations
  has_many :customer_communications
  belongs_to :user

  STATES = ['idea', 'contacted', 'negotiation', 'active']

  def state_name
    STATES[self.state || 0]
  end

end