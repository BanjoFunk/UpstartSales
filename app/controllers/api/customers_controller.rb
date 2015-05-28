class Api::CustomersController < ApplicationController
  before_action :set_customer, only: [:show, :edit, :update, :destroy, :add_comment]
  load_and_authorize_resource :except => [:add_comment]

  def index
    @customers = Customer.real
    @states = Customer.order('sort_position ASC').real.group_by(&:state_name)
  end

  def show
  end

  def new
    @customer = Customer.new
  end

  def edit
  end

  def create
    if params[:customer][:name] != ""
      @customer = Customer.new(params[:customer])
      @customer.state = 0
      @customer.save
      render :partial => "api/customers/customer.json", :locals => { :customer => @customer }
    end
  end

  def update
    params.permit!
    @customer.update_attributes(params[:customer])
    render :partial => "api/customers/customer.json", :locals => { :customer => @customer }
  end

  def destroy
    @customer.delete
    head 200, content_type: "text/html"
  end

  def add_comment
    params.permit!
    comment = @customer.comments.create(:user => current_user, :text => params[:text])
    render :partial => "api/comments/comment.json", :locals => { :comment => comment }
  end

  def sort
    params.permit!
    sort = params['sort']
    idx = 0
    sort.each do |state ,customers|
      state_id = Customer::STATES.index(state)
      if customers
        customers.each do |customer_id|
          c = Customer.find(customer_id.to_i)
          c.state = state_id
          c.sort_position = idx
          idx += 1
          c.save
        end
      end
    end
    @states = Customer.order('sort_position ASC').all.group_by(&:state_name)
  end

  private

  def set_customer
    @customer = Customer.find(params[:id])
  end

  def customer_params
    params.permit(:name)
  end

end
