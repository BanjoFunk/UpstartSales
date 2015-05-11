json.array! @customer_communications do |customer_communication|
  json.partial! 'customer_communication', customer_communication: customer_communication
end