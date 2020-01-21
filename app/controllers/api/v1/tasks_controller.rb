class Api::V1::TasksController < ApplicationController
  before_action :require_user
  before_action :require_same_user, except: [:index, :create]

  def index
    tasks = current_user.tasks.order(created_at: :desc)
    render json: tasks
  end

  def create
    task = Task.new(task_params)
    task.user = current_user
    if task.save
      render json: { task: task, categories: task.categories }
    else
      render json: task.errors.full_messages
    end
  end

  def show
    if task && (task.user == current_user)
      render json: {
          task: task,
          categories: task.categories,
          allCategories: current_user.categories
      }
    else
      redirect_to root_path
    end
  end

  def destroy
    task&.destroy
    render json: { message: 'Task has been successfully deleted!' }
  end

  def edit
    if task
      if task.update(task_params)
        render json: task
      else
        render json: { message: "Task was not updated successfully." }
      end
    else
      redirect_to root_path
    end
  end

  private

  def task_params
    params.permit(:title, :description, :status, category_ids: [])
  end

  def task
    @task ||= Task.find(params[:id])
  end

  def require_user
    unless logged_in?
      redirect_to root_path
    end
  end

  def require_same_user
    if logged_in?
      if task
        if task.user != current_user
          redirect_to root_path
        end
      end
    end
  end

end
