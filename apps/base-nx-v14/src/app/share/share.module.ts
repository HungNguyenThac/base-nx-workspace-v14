import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./modules/material.modules";
import { HttpClientModule } from "@angular/common/http";
import { directives } from "@app/share/directives";
import { pipes } from "@app/share/pipes";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [...directives, ...pipes],
  imports: [MaterialModule, CommonModule, BrowserAnimationsModule, BrowserModule, HttpClientModule],
  exports: [MaterialModule, ...directives, ...pipes],
  providers: [],
})
export class ShareModule {}
