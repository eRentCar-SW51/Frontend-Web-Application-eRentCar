import {Component, Injectable, OnInit} from '@angular/core';
import {ClientService} from "./my-profile/services/client.service";
import {Client} from "./my-profile/model/client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend-web-application-erentcar';
  currentClientId: string = "1";
  clientData!: Client;
  menuOptions = [
    { name: "Search auto", url: `client/${(this.currentClientId)}/search` },
    { name: "Reservations", url: `client/${(this.currentClientId)}/reservations` },
    { name: "My cars", url: `client/${(this.currentClientId)}/my-car` },
    { name: "Rentals", url: `client/${(this.currentClientId)}/rentals` },
    { name: "My Favourites", url: `client/${(this.currentClientId)}/favourites` },
    { name: "Subscription", url: `client/${(this.currentClientId)}/subscription` },
    { name: "Sign Out", url: '' }
  ];

  constructor(private clientService: ClientService) {
    this.clientData = {} as Client;
  }

  ngOnInit(): void {
    this.getClient();
  }
  async getClient() {
    await this.clientService.getById(this.currentClientId).subscribe((response: any) => {
      this.clientData = response;
      localStorage.setItem('clientData', JSON.stringify(response));
    });
  }
}
