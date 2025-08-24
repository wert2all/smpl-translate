import { Component, inject } from '@angular/core';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notification.component.html',
  imports: [AlertComponent],
})
export class NotificationComponent {
  private notificationService = inject(NotificationService);

  protected notifications = this.notificationService.nonReadableNotifications;
}
