import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-node-add',
  standalone: false,
  templateUrl: './node-add.component.html',
  styleUrl: './node-add.component.scss',
})
export class NodeAddComponent implements OnInit {
  public type = signal<string>('');
  private activateRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.type.set(params['type']);
    });
  }
}
