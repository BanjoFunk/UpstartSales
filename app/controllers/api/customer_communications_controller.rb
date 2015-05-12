class Api::CustomerCommunicationsController < ApplicationController

  def index
    @customer_communications = Customer.find(params[:customer_id]).customer_communications
  end

  def show
  end

  def new
  end

  def edit
  end

  def create
    params.permit!
    @customer_communication = Customer.find(params[:customer_id]).customer_communications.create(params[:customer_communication])
    render :partial => "api/customer_communications/customer_communication.json", :locals => { :customer_communication => @customer_communication }
  end

  def update
    params.permit!
    @customer_communication = CustomerCommunication.find(params[:id])
    @customer_communication.update_attributes(params[:customer_communication])
    render :partial => "api/customer_communications/customer_communication.json", :locals => { :customer_communication => @customer_communication }
  end

  def destroy
    @customer_communication = CustomerCommunication.find(params[:id])
    @customer_communication.delete
    head 200, content_type: "text/html"
  end

  def add_comment
  end

  private

  def location_params
    params.require(:customer_communication).permit(:id, :communication_type, :communicated_with, :notes)
  end

end
