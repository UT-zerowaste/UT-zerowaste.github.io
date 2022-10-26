import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bin-view',
  templateUrl: './bin-view.component.html',
  styleUrls: ['./bin-view.component.scss']
})
export class BinViewComponent implements OnInit {

  currentId: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.currentId = parseInt(this.route.snapshot.paramMap.get('id')!);
  }

  backToDetails() {
    this.router.navigateByUrl("/details/" + this.currentId);
  }

}
