class Api::V2::UsersController < ApplicationController
  before_action :admin

  def index
    users = User.all.order(created_at: :desc)
    render json: users
  end

  def show
    if user
      render json: user
    else
      render json: user.errors.full_messages
    end
  end

  def destroy
    user&.destroy
    render json: { message: 'User deleted!'}
  end

  private

  def user
    @user ||= User.find(params[:id])
  end

  def admin
    unless current_user.admin?
      redirect_to root_path
    end
  end
end
