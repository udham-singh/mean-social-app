import { NgModule } from '@angular/core';
import {
  MatDialogModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  declarations: [],
  providers: []
})
export class MaterialModule {}
