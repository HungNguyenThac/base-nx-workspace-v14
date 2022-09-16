import { Component, OnInit } from "@angular/core";
import { layout } from "@app/layout";

@Component({
  standalone: true,
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"],
  imports: [layout],
})
export class MainLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
