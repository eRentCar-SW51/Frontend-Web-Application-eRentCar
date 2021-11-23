import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CarsService} from "../../../search-car/services/cars.service";
import {Car} from "../../../search-car/model/car";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {RentDialogComponent} from "../../../search-car/pages/rent-dialog/rent-dialog.component";
import {MyFavouritesService} from "../../../my-favourites/services/my-favourites.service";
import {CarModelsService} from "../../../search-car/services/car-models.service";
import {CarBrandsService} from "../../../search-car/services/car-brands.service";
import {MyFavourites} from "../../../my-favourites/model/my-favourites";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  carId!: number;
  carData!: Car;
  clientId!: number;
  days: number = 1;

  isFavourite = false;
  favourite: MyFavourites = {
    id: 0,
    clientId: 0,
    carId: 0
  };

  constructor(
    private route: ActivatedRoute,
    private carService: CarsService,
    private location: Location,
    public rentDialog: MatDialog,
    private favouriteService: MyFavouritesService,
    private carModelsService: CarModelsService,
    private carBrandsService: CarBrandsService,
  ) {
    this.carId = parseInt(this.route.snapshot.params.carId);
    this.clientId = parseInt(<string>localStorage.getItem('clientId'));
    this.carData = {} as Car
  }

  ngOnInit(): void {
    this.getCar();
    this.getFavourites();
  }

  getCar(): void {
    this.carService.getById(this.carId).subscribe((response: any) => {
      this.carData = response;
      this.getModelName(response.carModelId);
    });
  }

  getModelName(carModelId: number): any {
    this.carModelsService.getById(carModelId).subscribe((response: any) => {
      this.carData.model = response.name;
      this.getBrandName(response.carBrandId);
    });
  }

  getBrandName(carBrandId: number): any {
    this.carBrandsService.getById(carBrandId).subscribe((response: any) => {
      this.carData.brand = response.name;
    });
  }

  getFavourites() {
    this.favouriteService.getByClientId(this.clientId).subscribe((response: any) => {
      for (let i = 0; i < response.content.length; i++) {
        if (response.content[i].carId == this.carId) {
          this.isFavourite = true;
        }
      }
    });
  }

  getPrice(): number {
    return this.days * this.carData.rentAmountDay;
  }

  goBack(): void {
    this.location.back();
  }

  openRentDialog(): void {
    this.rentDialog.open(RentDialogComponent, {
      width: '300px',
      data: {
        car: this.carData,
        clientId: this.clientId
      }
    });
  }

  addFavourite() {
    this.favourite.carId = this.carId;
    this.favourite.clientId = this.clientId;

    this.favouriteService
      .create(this.favourite.clientId, this.favourite.carId)
      .subscribe((response: any) => {
        this.isFavourite = true;
        this.favourite = response;
    });
  }

  deleteFavourite(id: number) {
    this.favouriteService.delete(id).subscribe((response: any) => {
      this.isFavourite = false;
    });
  }

  actionFavourite() {
    if (this.isFavourite) {
      this.favouriteService.getByClientId(this.clientId).subscribe((response: any) => {
        for (let i = 0; i < response.content.length; i++) {
          if (response.content[i].carId == this.carId) {
            this.deleteFavourite(response.content[i].id);
          }
        }
      });
    }
    else {
      this.addFavourite();
    }
  }
}
