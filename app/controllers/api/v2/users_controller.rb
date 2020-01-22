class Api::V2::UsersController < ApplicationController
  before_action :admin, except: [:show, :update]

  def index
    users = User.all.order(created_at: :desc)
    render json: users
  end

  def show
    if user
      if user.id == current_user.id || current_user.admin
        render json: user
      else
        redirect_to root_path
      end
    else
      render json: user.errors.full_messages
    end
  end

  def destroy
    user&.destroy
    render json: { message: 'User deleted!'}
  end

  def update
    if user.update(
        username: params['user']['username'],
        email: params['user']['email'],
        password: params['user']['password'],
        password_confirmation: params['user']['password_confirmation']
    )
      render json: {
          status: :updated,
          user: user
      }
    else
      render json: {
          status: 500,
          errors: "User credentials invalid"
      }
    end
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
