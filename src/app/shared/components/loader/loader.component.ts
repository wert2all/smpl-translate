import { Component } from '@angular/core';

@Component({
  selector: 'app-shared-loader',
  template: `<div class="flex place-items-center border-1 p-4">
    Loading <span class="cursor"></span>
  </div>`,
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {}
