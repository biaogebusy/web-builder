import { Component, OnInit } from '@angular/core';
import { ManageService } from '@core/service/manage.service';
import { IDynamicTable } from '@core/interface/widgets/IWidgets';

@Component({
  selector: 'app-manage-block',
  templateUrl: './manage-block.component.html',
  styleUrls: ['./manage-block.component.scss'],
})
export class ManageBlockComponent implements OnInit {
  blocks: IDynamicTable;
  constructor(public manageSerive: ManageService) {}

  ngOnInit(): void {
    const header = [
      {
        label: '序号',
        key: 'index',
      },
      {
        label: '名称',
        key: 'label',
      },
      {
        label: 'id',
        key: 'id',
      },
      {
        label: '描述',
        key: 'description',
      },
    ];
    this.manageSerive.getBlock().subscribe((blocks: any) => {
      console.log(blocks);
      if (!blocks.data.length) {
        return;
      }
      this.blocks = {
        header,
        elements: blocks.data.map((block: any, index: number) => {
          const attr = block.attributes;
          return {
            index: index + 1,
            label: attr.label,
            description: attr.description,
            id: attr.drupal_internal__id,
          };
        }),
      };
    });
  }
}
