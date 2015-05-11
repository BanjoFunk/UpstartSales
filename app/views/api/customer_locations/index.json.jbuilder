json.array! @customer_locations do |customer_location|
  json.partial! 'customer_location', customer_location: customer_location
end