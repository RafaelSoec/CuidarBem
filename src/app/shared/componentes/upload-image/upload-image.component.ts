import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.scss"],
})
export class UploadImageComponent implements OnInit {
  public server: string;

  constructor() {}

  ngOnInit(): void {
    this.server = `${environment.apiServer}/carregarFoto`;
  }

  carregarFoto(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onloadend = function () {
        console.log(reader.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
