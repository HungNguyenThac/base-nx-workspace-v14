import { Component, OnInit } from "@angular/core";
import { LoadingService } from "@core/services/loading.service";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"],
  imports: [CommonModule],
})
export class LoadingComponent implements OnInit {
  constructor(public loading: LoadingService) {}

  ngOnInit(): void {}
}
