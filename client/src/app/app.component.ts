import {Component} from '@angular/core';
import {SomeSharedModel} from '@core/some-shared-model';


console.log(SomeSharedModel);

const t: SomeSharedModel = null;

@Component({
  selector: 'prk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prk';
}
