json.array! @customer_contacts do |customer_contact|
  json.partial! 'customer_contact', customer_contact: customer_contact
end