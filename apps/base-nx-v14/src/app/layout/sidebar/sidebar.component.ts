import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "@app/layout/footer/footer.component";
import { HeaderComponent } from "@app/layout/header/header.component";

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],

})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
