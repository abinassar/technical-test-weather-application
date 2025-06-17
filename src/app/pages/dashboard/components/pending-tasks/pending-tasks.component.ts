import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { PendingTask } from '@core/models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    TranslateModule,
    MatButtonModule
  ]
})
export class PendingTasksComponent {

  @Input() pendingTasks: PendingTask[] = [];
  @Output() pendingTasksChange = new EventEmitter<PendingTask[]>();
  tasksForm: FormGroup = this.fb.group({
    task: this.fb.control('')
  });

  constructor(private fb: FormBuilder
  ) { }

  get taskControl(): AbstractControl<any, any> | null {
    return this.tasksForm.get('task');
  }

  @HostListener('keydown.enter', [
    '$event',
  ])
  enterEnterKey(event: KeyboardEvent) {
    if (this.tasksForm.invalid) return;
    this.addTask();
  }

  addTask() {
    const task: PendingTask = {
      taskName: this.taskControl?.value,
      completed: false
    };

    this.pendingTasks.unshift(task);
  }

  completeTask(index: number) {
    this.pendingTasks[index].completed = true;
  }

  deleteTask(index: number) {
    this.pendingTasks.splice(index, 1);
  }

}
