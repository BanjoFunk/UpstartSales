class CustomerCommunication < ActiveRecord::Base
  belongs_to :customer
  attr_accessor :DT_RowId, :type_html

  COMMUNICATION_TYPES = ['email', 'phone', 'in person']
  COMMUNICATION_ICONS = ['<span class="glyphicon glyphicon-envelope"></span>', '<span class="glyphicon glyphicon-earphone"></span>', '<span class="glyphicon glyphicon-user"></span>']

  def type_name
    COMMUNICATION_TYPES[self.communication_type || 0]
  end

  def type_html
    "#{COMMUNICATION_ICONS[self.communication_type || 0]} #{COMMUNICATION_TYPES[self.communication_type || 0]}"
  end

end