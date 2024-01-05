import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, NgIf } from '@angular/common';
import { TableToolbarComponent } from './table-toolbar/table-toolbar.component';
import { DetailsToolbarComponent } from './details-toolbar/details-toolbar.component';

@Component({
    selector: 'app-action-toolbar',
    standalone: true,
    imports: [MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule, AsyncPipe, NgIf, TableToolbarComponent, DetailsToolbarComponent],
    templateUrl: './action-toolbar.component.html',
    styleUrl: './action-toolbar.component.scss'
})
export class ActionToolbarComponent implements OnInit {

    constructor() {}

    ngOnInit() {
    }

}
