import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      MaterialModule,
      RouterModule
  ],
  exports: [],
  declarations: [PostCreateComponent, PostListComponent],
  providers: []
})
export class PostsModule {}
