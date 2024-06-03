#! /usr/bin/env node

import inquirer from 'inquirer';

class Task {
  constructor(public title: string, public description: string) {}
}

class TaskManager {
  private tasks: Task[] = [];

  addTask(task: Task) {
    this.tasks.push(task);
  }

  listTasks(): Task[] {
    return this.tasks;
  }
}

class TaskApp {
  private taskManager: TaskManager = new TaskManager();

  async start() {
    do {
      const { action } = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Add Task', 'List Tasks', 'Exit'],
      });

      switch (action) {
        case 'Add Task':
          await this.addTask();
          break;
        case 'List Tasks':
          this.listTasks();
          break;
        case 'Exit':
          console.log('Exiting the application...');
          process.exit();
      }
    } while (true);
  }

  private async addTask() {
    const taskDetails = await inquirer.prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter task title:',
      },
      {
        name: 'description',
        type: 'input',
        message: 'Enter task description:',
      },
    ]);

    const newTask = new Task(taskDetails.title, taskDetails.description);
    this.taskManager.addTask(newTask);
    console.log(`Task "${newTask.title}" added successfully!`);
  }

  private listTasks() {
    const tasks = this.taskManager.listTasks();
    if (tasks.length === 0) {
      console.log('No tasks available.');
    } else {
      console.log('Current Tasks:');
      tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.title}: ${task.description}`);
      });
    }
  }
}

const app = new TaskApp();
app.start();
