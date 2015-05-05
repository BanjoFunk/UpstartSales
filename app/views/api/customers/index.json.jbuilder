@states.each do |state, customers|
  json.set! state do
    json.array! customers.each do |customer|
      json.partial! '/api/customers/customer', customer: customer
    end
  end
end