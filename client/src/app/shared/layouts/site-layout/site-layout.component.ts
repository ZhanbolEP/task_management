import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import {MaterialService} from '../../classes/material.service'


declare const M: any; // Import MaterializeCSS globally if it’s loaded via a script tag

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('floating') floatingRef!: ElementRef;

  links = [
    { url: '/overview', name: 'Обзор' },
    { url: '/analytics', name: 'Аналитика' },
    { url: '/history', name: 'История' },
    { url: '/order', name: 'Добавить заказ' },
    { url: '/categories', name: 'Ассортимент' }
  ];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    MaterialService.initializeFloatingButton(this.floatingRef)
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout(); // Call logout method in AuthService
    this.router.navigate(['/login'], { queryParams: { loggedOut: true } });
  }
}
