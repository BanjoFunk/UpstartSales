class Api::CustomersController < ApplicationController
  before_action :set_batch, only: [:show, :edit, :update, :destroy, :add_comment]
  load_and_authorize_resource :except => [:add_comment]

  def index
    @customers = Customer.all
    @states = Customer.order('sort_position ASC').all.group_by(&:state)
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
      @customer = Customer.create(params[:customer])
      @customer.states.create(:state_id => 0)
      render :partial => "api/customers/customer.json", :locals => { :customer => @customer }
    end
  end

  def update
    params.permit!
    @customer.update_attributes(params[:customer])
    render :partial => "api/customers/customer.json", :locals => { :customer => @customer }
  end

  def destroy
    @customer.destroy
  end

  def add_comment
    params.permit!
    comment = @customer.comments.create(:user => current_user, :text => params[:text])
    render :partial => "api/comments/comment.json", :locals => { :comment => comment }
  end

  def sort
    params.permit!
    sort = params['sort']
    sort.each do |state ,customers|
      state_id = Customer::STATES.index(state)
      if customers
        customers.each_with_index do |customer_id, idx|
          c = Customer.find(customer_id.to_i)
          c.states.create(:state_id => state_id) if c.state_id != state_id
          c.sort_position = idx
          c.save
        end
      end
    end
    @states = Customer.all.group_by(&:state)
  end

  private

  def set_customer
    @customer = Customer.find(params[:id])
  end

  def customer_params
    params.permit(:name)
  end

end
