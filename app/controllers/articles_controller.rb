class ArticlesController < ApplicationController
  before_action :set_article, only: [:edit, :update, :show, :destroy]
  before_action :require_user
  before_action :require_same_user, only: [:edit, :update, :destroy]

  def new
    @article = Article.new
  end

  def edit
  end

  def update
    if @article.update(article_params)
      flash[:success] = "Task was successfully updated"
      redirect_to article_path(@article)
    else
      render 'edit'
    end
    
  end

  def create
    #render plain: params[:article].inspect
    #@article.save
    #redirect_to article_path(@article)
    #debugger
    @article = Article.new(article_params)
    @article.user = current_user
    if @article.save
      flash[:success] = "Task was successfully created"
      redirect_to article_path(@article)
    else
      render 'new'
    end
  end

  def index
    arts = current_user.articles
    @articles = arts.paginate(page: params[:page], per_page: 5)
  end

  def changestatus
    @article = Article.find(params[:id])
    @article.toggle!(:status)
    redirect_to article_path(@article)
  end

  def show
  end

  def destroy
    @article.destroy
    flash[:warning] = "Task was successfully deleted"
    redirect_to user_path(current_user)
  end

  private
  def set_article
    @article = Article.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :description, category_ids: [])
  end

  def require_same_user
    if current_user != @article.user and !current_user.admin?
      flash[:danger] = "You can only edit or delete your own tasks"
      redirect_to root_path
    end
  end

end