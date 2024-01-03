import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-action-toolbar',
    standalone: true,
    imports: [MatButtonModule, MatFormFieldModule, MatInputModule],
    templateUrl: './action-toolbar.component.html',
    styleUrl: './action-toolbar.component.scss'
})
export class ActionToolbarComponent {

}
