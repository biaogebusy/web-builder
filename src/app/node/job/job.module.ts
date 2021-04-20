import { NgModule } from '@angular/core';
import { JobFilterComponent } from './job-filter/job-filter.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobNodeComponent } from './job-node/job-node.component';
import { ShareModule } from '../../share/share.module';
import { JobComponent } from './job.component';
import { UiuxModule } from '../../uiux/uiux.module';
@NgModule({
  declarations: [
    JobFilterComponent,
    JobListComponent,
    JobNodeComponent,
    JobComponent,
  ],
  imports: [ShareModule, UiuxModule],
})
export class JobModule {}
