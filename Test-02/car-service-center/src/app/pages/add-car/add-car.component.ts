import { Component } from '@angular/core';
import { CarService } from '../../services/car.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.scss'
})
export class AddCarComponent {

  car = { licensePlate: '', model: '' };

  constructor(private carService: CarService) {}

  submit() {
    this.carService.addCar(this.car).subscribe(() => {
      alert('Car added!');
      this.car = { licensePlate: '', model: '' };
    });
  }

}
