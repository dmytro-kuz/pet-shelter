import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { DialogDelete } from '../interfaces/dialog-delete';

@Component({
  selector: 'app-delete-alert-dialog',
  templateUrl: './delete-alert-dialog.component.html',
  styleUrls: ['./delete-alert-dialog.component.scss'],
})
export class DeleteAlertDialogComponent implements OnInit {
  loading$ = this.loader.loading$;
  constructor(
    public dialogRef: MatDialogRef<DeleteAlertDialogComponent>,
    private loader: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDelete,
  ) {}
  ngOnInit() {}

  onClick(change: boolean): void {
    this.dialogRef.close(change);
  }
}
