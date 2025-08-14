import { Component } from '@angular/core';

@Component({
  selector: 'app-shared-dialog-controls',
  template: ` <div class="sm:flex sm:flex-row-reverse"><ng-content /></div> `,
})
export class ControlsComponent { }
