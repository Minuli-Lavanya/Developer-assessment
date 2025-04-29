import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { JobService } from '../../services/job.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  totalCars = 0;
  pending = 0;
  completed = 0;

  constructor(private carService: CarService, private jobService: JobService) {}

  ngOnInit() {
    this.carService.getCars().subscribe((cars: any) => {
      this.totalCars = cars.length;
    });

    this.jobService.getJobs().subscribe((jobs: any) => {
      this.pending = jobs.filter((j: any) => j.status === 'Pending').length;
      this.completed = jobs.filter((j: any) => j.status === 'Completed').length;
    });
  }
}
