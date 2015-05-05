class Customer < ActiveRecord::Base
  has_many :states, :as => :stateable
  has_many :comments, :as => :commentable
  has_many :customer_contacts
  has_many :customer_locations
  has_many :customer_communications
  belongs_to :user

  STATES = ['idea', 'contacted', 'negotiation', 'active']

  def state
    STATES[self.states.order('created_at DESC').first.state_id]
  end

  def state_id
    self.states.order('created_at DESC').first.state_id
  end

end