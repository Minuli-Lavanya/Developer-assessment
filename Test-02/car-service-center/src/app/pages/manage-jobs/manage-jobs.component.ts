import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { JobService } from '../../services/job.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-manage-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './manage-jobs.component.html',
  styleUrl: './manage-jobs.component.scss'
})
export class ManageJobsComponent implements OnInit {

  cars: any[] = [];
  jobs: any[] = [];
  job = { carId: '', description: '' };

  constructor(private carService: CarService, private jobService: JobService) {}

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.carService.getCars().subscribe(c => this.cars = c as any[]);
    this.jobService.getJobs().subscribe(j => this.jobs = j as any[]);
  }

  submit() {
    this.jobService.addJob(this.job).subscribe(() => {
      this.job = { carId: '', description: '' };
      this.fetch();
    });
  }

  updateStatus(id: string, status: string) {
    this.jobService.updateStatus(id, status).subscribe(() => this.fetch());
  }

}
