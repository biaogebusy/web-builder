import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobFilterComponent } from './job-filter/job-filter.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobNodeComponent } from './job-node/job-node.component';
import { ShareModule } from '../share/share.module';
import { JobComponent } from './job.component';
import { MapComponent } from './map/map.component';
@NgModule({
  declarations: [
    JobFilterComponent,
    JobListComponent,
    JobNodeComponent,
    JobComponent,
    MapComponent,
  ],
  imports: [CommonModule, ShareModule],
})
export class JobModule {}
