import { Component } from '@angular/core';

@Component({
  selector: 'app-img-uploader',
  templateUrl: './img-uploader.component.html',
  styleUrls: ['./img-uploader.component.scss']
})
export class ImgUploaderComponent {
  title = 'Image Uploader';
  dataUrl = '../../../assets/img/users.png';

  readUrl(files: FileList) {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.dataUrl = reader.result;
      };
    }
  }
}
