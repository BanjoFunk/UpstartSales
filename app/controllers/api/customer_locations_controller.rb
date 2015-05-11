class Api::CustomerLocationsController < ApplicationController

  def index
    @customer_locations = Customer.find(params[:customer_id]).customer_locations
  end

  def show
  end

  def new
  end

  def edit
  end

  def create
    params.permit!
    @customer_location = Customer.find(params[:customer_id]).customer_locations.create(params[:customer_location])
    render :partial => "api/customer_locations/customer_location.json", :locals => { :customer_location => @customer_location }
  end

  def update
  end

  def destroy
  end

  def add_comment
  end

  private

  def set_location
  end

  def location_params
    params.require(:customer_location).permit(:short_name, :address_1, :address_2, :city, :state, :zip)
  end

end
