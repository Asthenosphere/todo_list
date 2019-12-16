class CategoriesController < ApplicationController

  before_action :require_user

  def index
    cats = current_user.categories
    @categories = cats.paginate(page: params[:page], per_page: 5)
  end

  def new
    @category = Category.new
  end

  def create
    @category = Category.new(category_params)
    @category.user = current_user
    if @category.save
      flash[:success] = "Category was created successfully. You may now select it when you create or update tasks"
      redirect_to user_path(current_user)
    else
      render 'new'
    end
  end

  def show
    @category = Category.find(params[:id])
    @category_articles = @category.articles.paginate(page: params[:page], per_page: 5)
  end

  def destroy
    @category = Category.find(params[:id])
    @category.destroy
    flash[:warning] = "Category was deleted successfully"
    redirect_to categories_path
  end

  def edit
    @category = Category.find(params[:id])
  end

  def update
    @category = Category.find(params[:id])
    if @category.update(category_params)
      flash[:success] = "Category name was successfully updated"
      redirect_to category_path(@category)
    end
  end

  private
  def category_params
    params.require(:category).permit(:name)
  end

  def require_user
    if !logged_in?
      flash[:danger] = "You must be logged in to perform that action"
      redirect_to root_path
    end
  end

end