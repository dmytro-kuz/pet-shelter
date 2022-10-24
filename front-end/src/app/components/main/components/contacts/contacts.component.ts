import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/service/loading.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  constructor(private loader: LoadingService) {}
  loading$ = this.loader.loading$;
  ngOnInit() {}
}
