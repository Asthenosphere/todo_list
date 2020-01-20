class Api::V3::CategoriesController < ApplicationController
  before_action :require_user
  before_action :require_same_user, except: [:index, :create]

  def index
    categories = current_user.categories.order(created_at: :desc)
    render json: categories
  end

  def create
    category = Category.new(category_params)
    category.user = current_user
    if category.save
      render json: category
    else
      render json: category.errors.full_messages
    end
  end

  def show
    if category && (category.user == current_user)
      render json: {
          category: category,
          tasks: category.tasks
      }
    else
      redirect_to root_path
    end
  end

  def update
    if category
      if category.update(category_params)
        render json: category
      else
        render json: { message: "Category was not created successfully." }
      end
    else
      redirect_to root_path
    end
  end

  def destroy
    category&.destroy
    render json: { message: "Category deleted!" }
  end

  private

  def category_params
    params.permit(:name, :description)
  end

  def category
    @category ||= Category.find(params[:id])
  end

  def require_user
    unless logged_in?
      redirect_to root_path
    end
  end

  def require_same_user
    unless logged_in?
      unless category
        unless category.user == current_user
          redirect_to root_path
        end
      end
    end
  end

end
