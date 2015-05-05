class Api::CustomerContactsController < ApplicationController

  def index
    @customer_contacts = Customer.find(params[:customer_id]).customer_contacts
  end

  def show
  end

  def new
  end

  def edit
  end

  def create
    @customer_contact = Customer.find(params[:customer_id]).customer_contacts.create(params[:customer_contact])
    render :partial => "api/customer_contacts/customer_contact.json", :locals => { :customer_contact => @customer_contact }
  end

  def update
  end

  def destroy
  end

  def add_comment
  end

  private

  def set_customer
  end

  def customer_contact_params
    params.require(:customer_contact).permit(:first_name, :last_name, :email, :phone, :position, :primary)
  end

end
